import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers, type UserRecord } from "../../../services/userService";

const getUserId = (user: UserRecord) => user.id ?? user._id;

const getName = (user: UserRecord) => user.name ?? user.nama ?? "-";

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function UserIndex() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setUsers(await getUsers());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Gagal mengambil data user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (user: UserRecord) => {
    const id = getUserId(user);
    if (!id) return;

    const confirmDelete = confirm(`Yakin ingin menghapus user ${getName(user)}?`);
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (deleteError) {
      alert(deleteError instanceof Error ? deleteError.message : "Gagal menghapus user");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#802D43]">User</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola akun pengguna dashboard.</p>
        </div>

        <Link to="/dashboard/user/create" className="inline-flex items-center justify-center rounded-xl bg-[#802D43] px-5 py-3 font-semibold text-white transition hover:bg-[#6b2437]">
          Tambah User
        </Link>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500 shadow-sm">
          Memuat data user...
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600 shadow-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && users.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500 shadow-sm">
          Belum ada data user.
        </div>
      )}

      {!isLoading && !error && users.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["No", "Nama", "Email", "Role", "Status", "Created At", "Aksi"].map((title) => (
                    <th key={title} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => {
                  const id = getUserId(user);

                  return (
                    <tr key={String(id ?? user.email ?? index)} className="hover:bg-gray-50/70">
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-800">{getName(user)}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">{user.email ?? "-"}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">{user.role ?? "-"}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-full bg-[#802D43]/10 px-3 py-1 text-xs font-semibold text-[#802D43]">
                          {user.status ?? "-"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">{formatDate(user.createdAt)}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex gap-2">
                          {id && (
                            <Link to={`/dashboard/user/update/${id}`} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                              Edit
                            </Link>
                          )}
                          <button type="button" onClick={() => handleDelete(user)} disabled={!id || deletingId === id} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">
                            {deletingId === id ? "Hapus..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
