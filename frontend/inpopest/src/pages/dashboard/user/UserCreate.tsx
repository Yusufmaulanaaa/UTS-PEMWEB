import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../services/userService";

type FormState = {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
  role: "USER",
  status: "ACTIVE",
};

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export default function UserCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = "Nama wajib diisi";
    if (!form.email.trim()) nextErrors.email = "Email wajib diisi";
    if (form.email.trim() && !isValidEmail(form.email)) {
      nextErrors.email = "Format email tidak valid";
    }
    if (!form.password) nextErrors.password = "Password wajib diisi";
    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password minimal 6 karakter";
    }
    if (!form.role.trim()) nextErrors.role = "Role wajib diisi";
    if (!form.status.trim()) nextErrors.status = "Status wajib diisi";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setApiError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      await createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        status: form.status,
      });
      navigate("/dashboard/user");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Gagal menambahkan user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#802D43]">Tambah User</h1>
        <p className="text-sm text-gray-500 mt-1">Buat akun dashboard baru.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {apiError && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError}
          </div>
        )}

        <div className="grid gap-5">
          <Field label="Nama" error={errors.name}>
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#802D43] focus:ring-2 focus:ring-[#802D43]/10" />
          </Field>

          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#802D43] focus:ring-2 focus:ring-[#802D43]/10" />
          </Field>

          <Field label="Password" error={errors.password}>
            <input type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#802D43] focus:ring-2 focus:ring-[#802D43]/10" />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Role" error={errors.role}>
              <select value={form.role} onChange={(event) => updateField("role", event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#802D43] focus:ring-2 focus:ring-[#802D43]/10">
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </Field>

            <Field label="Status" error={errors.status}>
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#802D43] focus:ring-2 focus:ring-[#802D43]/10">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-[#802D43] px-5 py-3 font-semibold text-white transition hover:bg-[#6b2437] disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? "Menyimpan..." : "Simpan User"}
          </button>
          <Link to="/dashboard/user" className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-red-500">{error}</span>}
    </label>
  );
}
