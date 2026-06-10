import type { Request, Response } from "express";
import bcrypt from "bcrypt";
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

const parseId = (id: string | string[] | undefined) => {
  if (!id || Array.isArray(id)) return null;

  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: userSelect,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      message: "Data user berhasil diambil",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data user",
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      res.status(400).json({ message: "ID user tidak valid" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    res.json({
      message: "Detail user berhasil diambil",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail user",
      error,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, status } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      status?: string;
    };

    if (!name || !email || !password || !role || !status) {
      res.status(400).json({ message: "Nama, email, password, role, dan status wajib diisi" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "Email sudah digunakan" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role,
        status,
      },
      select: userSelect,
    });

    res.status(201).json({
      message: "User berhasil ditambahkan",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan user",
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      res.status(400).json({ message: "ID user tidak valid" });
      return;
    }

    const { name, email, password, role, status } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      status?: string;
    };

    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    if (email && email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: "Email sudah digunakan" });
        return;
      }
    }

    const data: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      status?: string;
    } = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (role) data.role = role;
    if (status) data.status = status;
    if (password?.trim()) data.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });

    res.json({
      message: "User berhasil diupdate",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate user",
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      res.status(400).json({ message: "ID user tidak valid" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    await prisma.user.delete({ where: { id } });

    res.json({
      message: "User berhasil dihapus",
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus user",
      error,
    });
  }
};
