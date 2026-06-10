import { useAuthStore } from "../store/useAuthStore";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://uts-backend-chi.vercel.app";
const LOCAL_DEV_TOKEN = "local-dev-token";
const LOCAL_USERS_KEY = "local-dev-users";

export type UserPayload = {
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
};

export type UserRecord = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  nama?: string;
  email?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

type ApiResponse = {
  message?: string;
  data?: unknown;
  users?: unknown;
  user?: unknown;
  result?: unknown;
  error?: unknown;
};

const getToken = () => useAuthStore.getState().token;

const isLocalDevMode = () => getToken() === LOCAL_DEV_TOKEN;

const getLocalUsers = (): UserRecord[] => {
  const savedUsers = localStorage.getItem(LOCAL_USERS_KEY);
  if (!savedUsers) {
    const initialUsers: UserRecord[] = [
      {
        id: 1,
        name: "Admin",
        email: "24090087",
        role: "ADMIN",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }

  try {
    const parsed = JSON.parse(savedUsers);
    return Array.isArray(parsed) ? (parsed as UserRecord[]) : [];
  } catch {
    return [];
  }
};

const setLocalUsers = (users: UserRecord[]) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

const getNextLocalId = (users: UserRecord[]) =>
  users.reduce((maxId, user) => {
    const id = Number(user.id ?? user._id ?? 0);
    return Number.isFinite(id) && id > maxId ? id : maxId;
  }, 0) + 1;

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseJson = async (response: Response): Promise<ApiResponse | unknown> => {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text) as ApiResponse;
  } catch {
    return {};
  }
};

const getErrorMessage = (data: unknown, fallback: string) => {
  if (data && typeof data === "object" && "message" in data) {
    const message = (data as ApiResponse).message;
    if (message) return message;
  }

  return fallback;
};

const request = async (path: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options?.headers,
    },
  });
  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Request gagal diproses"));
  }

  return data;
};

const normalizeUsers = (response: unknown): UserRecord[] => {
  if (Array.isArray(response)) return response as UserRecord[];

  if (response && typeof response === "object") {
    const data = response as ApiResponse;
    const candidates = [data.data, data.users, data.result];
    const users = candidates.find(Array.isArray);

    return users ? (users as UserRecord[]) : [];
  }

  return [];
};

const normalizeUser = (response: unknown): UserRecord => {
  if (response && typeof response === "object") {
    const data = response as ApiResponse;
    const candidate = data.data ?? data.user ?? data.result ?? response;

    if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
      return candidate as UserRecord;
    }
  }

  return {};
};

export const getUsers = async () => {
  if (isLocalDevMode()) {
    return getLocalUsers();
  }

  return normalizeUsers(await request("/users"));
};

export const getUserById = async (id: string | number) => {
  if (isLocalDevMode()) {
    const user = getLocalUsers().find((item) => String(item.id ?? item._id) === String(id));
    if (!user) throw new Error("User tidak ditemukan");
    return user;
  }

  return normalizeUser(await request(`/users/${id}`));
};

export const createUser = async (data: UserPayload) => {
  if (isLocalDevMode()) {
    const users = getLocalUsers();
    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) throw new Error("Email sudah digunakan");

    const newUser: UserRecord = {
      id: getNextLocalId(users),
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: new Date().toISOString(),
    };
    setLocalUsers([newUser, ...users]);
    return newUser;
  }

  return normalizeUser(
    await request("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  );
};

export const updateUser = async (id: string | number, data: Partial<UserPayload>) => {
  if (isLocalDevMode()) {
    const users = getLocalUsers();
    const currentIndex = users.findIndex((user) => String(user.id ?? user._id) === String(id));
    if (currentIndex === -1) throw new Error("User tidak ditemukan");

    const emailExists = users.some(
      (user) => String(user.id ?? user._id) !== String(id) && user.email === data.email,
    );
    if (emailExists) throw new Error("Email sudah digunakan");

    const currentUser = users[currentIndex];
    const updatedUser: UserRecord = {
      ...currentUser,
      name: data.name ?? currentUser.name,
      email: data.email ?? currentUser.email,
      role: data.role ?? currentUser.role,
      status: data.status ?? currentUser.status,
      updatedAt: new Date().toISOString(),
    };

    const nextUsers = [...users];
    nextUsers[currentIndex] = updatedUser;
    setLocalUsers(nextUsers);
    return updatedUser;
  }

  return normalizeUser(
    await request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  );
};

export const deleteUser = async (id: string | number) => {
  if (isLocalDevMode()) {
    const users = getLocalUsers();
    setLocalUsers(users.filter((user) => String(user.id ?? user._id) !== String(id)));
    return { message: "User berhasil dihapus" };
  }

  return request(`/users/${id}`, {
    method: "DELETE",
  });
};
