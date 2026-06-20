import React from "react";
import { TextInput } from "flowbite-react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

export default function AdminOrderTab({
  searchOrder,
  setSearchOrder,
  orderList,
  loadingOrder,
  filteredOrders,
  updateStatusOrder,
  deleteOrder,
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <TextInput
          type="text"
          placeholder="Cari order (by status)..."
          icon={FiSearch}
          className="flex-1"
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  ID Order
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Customer
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  No. Telepon
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Total
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Tanggal
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {loadingOrder ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusStyles = {
                    selesai: "bg-green-50 text-green-600",
                    dibatalkan: "bg-red-50 text-red-600",
                    dikirim: "bg-blue-50 text-blue-600",
                    diproses: "bg-yellow-50 text-yellow-600",
                    pending: "bg-gray-100 text-gray-600",
                  };

                  const statuses = [
                    "pending",
                    "diproses",
                    "dikirim",
                    "selesai",
                    "dibatalkan",
                  ];

                  const currentIndex = statuses.indexOf(order.status);
                  const nextStatus =
                    statuses[(currentIndex + 1) % statuses.length];

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {order.user?.nama || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {order.user?.no_telp || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                        Rp{" "}
                        {parseInt(order.total_harga).toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg ${
                            statusStyles[order.status] || statusStyles.pending
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              updateStatusOrder(order.id, nextStatus)
                            }
                            className="text-blue-500 hover:text-blue-700"
                            title="Klik untuk ubah status"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    Belum ada order
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
