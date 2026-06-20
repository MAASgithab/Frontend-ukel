import React from "react";
import { Button, TextInput } from "flowbite-react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

export default function AdminProductsTab({
  searchProduk,
  setSearchProduk,
  kainList,
  loadingKain,
  openAddModal,
  openEditModal,
  deleteKain,
}) {
  const filteredKain = (kainList || []).filter((k) =>
    (k.nama || "").toLowerCase().includes((searchProduk || "").toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <TextInput
          type="text"
          placeholder="Cari produk..."
          icon={FiSearch}
          className="flex-1"
          value={searchProduk}
          onChange={(e) => setSearchProduk(e.target.value)}
        />
        <Button
          className="bg-[#06FE9F] text-gray-900 font-semibold"
          onClick={openAddModal}
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Produk
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Kategori
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Harga
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Stok
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loadingKain ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredKain.length > 0 ? (
                filteredKain.map((kain) => (
                  <tr
                    key={kain.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            kain.gambar ? `http://localhost:3000${kain.gambar}` : ""
                          }
                          alt={kain.nama}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {kain.nama}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">
                        {kain.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      Rp {parseInt(kain.harga).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {kain.stok}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEditModal(kain)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteKain(kain.id)}
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
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    Belum ada data kain
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
