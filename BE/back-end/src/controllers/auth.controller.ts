import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET belum diatur");
  }

  return secret;
};

const createToken = (user: { id: number; email: string; role: string }) =>
  jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn: "1d" },
  );

const LEGACY_ADMIN_LOGIN = {
  email: "24090087",
  password: "24090087",
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, status } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      status?: string;
    };

    if (!name || !email || !password) {
      res.status(400).json({ message: "Nama, email, dan password wajib diisi" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "Email sudah terdaftar" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER",
        status: status || "ACTIVE",
      },
      select: userSelect,
    });

    res.status(201).json({
      message: "Register berhasil",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal register user",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({ message: "Email dan password wajib diisi" });
      return;
    }

    if (email === LEGACY_ADMIN_LOGIN.email && password === LEGACY_ADMIN_LOGIN.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const legacyUser = await prisma.user.upsert({
        where: { email },
        update: {
          password: hashedPassword,
          role: "ADMIN",
          status: "ACTIVE",
        },
        create: {
          name: "Admin",
          email,
          password: hashedPassword,
          role: "ADMIN",
          status: "ACTIVE",
        },
        select: userSelect,
      });

      res.json({
        message: "Login berhasil",
        token: createToken(legacyUser),
        user: legacyUser,
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Email atau password salah" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Email atau password salah" });
      return;
    }

    const token = createToken(user);
    const { password: _password, ...safeUser } = user;

    res.json({
      message: "Login berhasil",
      token,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal login",
      error,
    });
  }
};
