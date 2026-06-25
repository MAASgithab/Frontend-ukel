import React from "react";
import { TextInput, Button } from "flowbite-react";
import { FiEdit2, FiTrash2, FiSearch, FiDownload } from "react-icons/fi";

export default function AdminUserTab({
  searchUser,
  setSearchUser,
  userList,
  loadingUser,
  filteredUsers,
  openEditUserModal,
  deleteUser,
  exportUsersToExcel,
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <TextInput
          type="text"
          placeholder="Cari user..."
          icon={FiSearch}
          className="flex-1"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <Button
          className="bg-green-600 text-white font-semibold"
          onClick={exportUsersToExcel}
        >
          <FiDownload className="w-4 h-4 mr-2" />
          Export Excel
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Nama
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Password
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Role
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  No. Telepon
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Tanggal Daftar
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {loadingUser ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {user.nama}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.password}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${
                          user.role?.nama_role === "Admin"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {user.role?.nama_role || "User"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.no_telp || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEditUserModal(user)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit data user"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    Belum ada user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
