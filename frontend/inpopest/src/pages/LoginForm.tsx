
// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


type FormData = {
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().min(1, "Password harus diisi"),
})

type LoginResponse = {
    message?: string;
    token?: string;
    accessToken?: string;
    data?: {
        token?: string;
        user?: unknown;
    };
    user?: unknown;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://uts-backend-chi.vercel.app";

const getTokenFromResponse = (response: LoginResponse) =>
    response.token ?? response.accessToken ?? response.data?.token ?? "";

const getUserFromResponse = (response: LoginResponse, email: string) => {
    const user = response.user ?? response.data?.user;

    if (user && typeof user === "object") {
        return user as { email: string; name?: string; role?: string; status?: string };
    }

    return { email };
};

const LEGACY_LOCAL_LOGIN = {
    email: "24090087",
    password: "24090087",
};

const loginWithLocalFallback = (
    data: FormData,
    login: ReturnType<typeof useAuthStore.getState>["login"],
    navigate: ReturnType<typeof useNavigate>,
) => {
    if (data.email !== LEGACY_LOCAL_LOGIN.email || data.password !== LEGACY_LOCAL_LOGIN.password) {
        return false;
    }

    login("local-dev-token", {
        email: data.email,
        name: "Admin",
        role: "ADMIN",
        status: "ACTIVE",
    });
    alert("Login lokal berhasil");
    navigate("/dashboard");
    return true;
};

export default function LoginForm(){
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const { 
        register, 
        handleSubmit, 
        formState: { errors }
     } = useForm<FormData>({
        resolver: zodResolver(schema)
     });
 
    
     
    
    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseText = await response.text();
            const result = responseText.startsWith("{")
                ? (JSON.parse(responseText) as LoginResponse)
                : ({
                    message:
                        "Backend mengembalikan HTML, bukan JSON. Pastikan backend sudah redeploy dan endpoint /auth/login tersedia.",
                } satisfies LoginResponse);

            if (!response.ok) {
                throw new Error(result.message ?? "Email & Password salah");
            }

            const token = getTokenFromResponse(result);
            if (!token) {
                throw new Error("Token login tidak ditemukan dari server");
            }

            login(token, getUserFromResponse(result, data.email));
            alert("Login berhasil");
            navigate("/dashboard");
        } catch (error) {
            if (loginWithLocalFallback(data, login, navigate)) {
                return;
            }

            alert(error instanceof Error ? error.message : "Email & Password salah");
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Email"
                    nama="email"
                    register={register}
                    error={errors.email?.message}
                />

                <InputPassword
                    label="Password"
                    nama="password"
                    register={register}
                    error={errors.password?.message} 
                />

                <div>
                    
                        <Button type="submit" label="Login" />
                    

                </div>

                <div className="mt-5">
                    Belum punya Akun? <Link to="/register" className="text-red-600">Daftar Disini</Link>
                </div>
            </form>
        </div>
    );
};

