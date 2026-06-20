import React from "react";

export default function AdminProductModal({
  showModal,
  editingProduct,
  formData,
  loadingSubmit,
  handleInputChange,
  handleFileChange,
  handleClose,
  onSubmit,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
          </h3>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Masukkan nama produk"
              value={formData.nama}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            >
              <option value="Batik">Batik</option>
              <option value="Tenun">Tenun</option>
              <option value="Songket">Songket</option>
              <option value="Ulos">Ulos</option>
              <option value="Lurik">Lurik</option>
              <option value="Kain Nusantara">Kain Nusantara</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga (Rp)
            </label>
            <input
              type="number"
              name="harga"
              placeholder="Masukkan harga"
              value={formData.harga}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lebar (cm)
            </label>
            <input
              type="number"
              name="lebar"
              placeholder="Masukkan lebar kain"
              value={formData.lebar}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok
            </label>
            <input
              type="number"
              name="stok"
              placeholder="Masukkan jumlah stok"
              value={formData.stok}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              placeholder="Masukkan deskripsi kain"
              value={formData.deskripsi}
              onChange={handleInputChange}
              rows="3"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Gambar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#06FE9F] file:text-gray-900 file:font-medium file:text-sm hover:file:brightness-95"
            />
            {formData.gambar && (
              <p className="text-xs text-gray-500 mt-1">
                File: {formData.gambar.name}
              </p>
            )}
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
            onClick={onSubmit}
            disabled={loadingSubmit}
            className="px-4 py-2 rounded-xl bg-[#06FE9F] text-sm text-gray-900 font-semibold disabled:opacity-50"
          >
            {loadingSubmit
              ? "Menyimpan..."
              : editingProduct
                ? "Simpan"
                : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}
