import React from "react";

export default function AdminEditUserModal({
  showUserModal,
  formUser,
  loadingSubmit,
  handleUserInputChange,
  handleClose,
  onSave,
}) {
  if (!showUserModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={formUser.nama}
              onChange={handleUserInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formUser.email}
              onChange={handleUserInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. Telepon
            </label>
            <input
              type="text"
              name="noTelp"
              placeholder="Masukkan no telepon"
              value={formUser.noTelp}
              onChange={handleUserInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              placeholder="Masukkan alamat"
              value={formUser.alamat}
              onChange={handleUserInputChange}
              rows="2"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="roleId"
              value={formUser.roleId}
              onChange={handleUserInputChange}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 font-medium"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-xl bg-[#06FE9F] text-sm text-gray-900 font-semibold disabled:opacity-50"
            disabled={loadingSubmit}
          >
            {loadingSubmit ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
