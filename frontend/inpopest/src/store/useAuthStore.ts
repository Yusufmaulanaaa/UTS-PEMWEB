
import { persist } from "zustand/middleware";
import { create  } from "zustand";

export type AuthUser = {
    id?: number | string;
    name?: string;
    email: string;
    role?: string;
    status?: string;
}

interface AuthState{
    isAuthenticated : boolean;
    user : AuthUser | null
    token : string | null;
    login : (token: string, user: AuthUser) => void;
    logout : () => void;

}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            token: null,
            login: (token: string, user: AuthUser) =>
                set ({isAuthenticated: true, token, user}),
            logout: () => set({ isAuthenticated: false, token: null, user:null}),

        }),
        {
            name: "auth-storage",
        },
    ),
);
