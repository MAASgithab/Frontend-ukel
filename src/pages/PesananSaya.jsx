import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { FiPackage, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const statusStyles = {
  "sedang diproses": {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
    label: "Sedang Diproses",
  },
  dikirim: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-400",
    label: "Dikirim",
  },
  selesai: {
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-400",
    label: "Selesai",
  },
  dibatalkan: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-400",
    label: "Dibatalkan",
  },
};

export default function PesananSaya() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMyOrders() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const result = await response.json();
      setOrders(result.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pesanan Saya</h1>
            <p className="text-gray-500 mt-1">
              {orders.length} pesanan
            </p>
          </div>
        </div>

        {/* Daftar Pesanan */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Memuat data...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">
              Belum ada pesanan
            </p>
            <Button
              className="bg-[#06FE9F] text-white font-semibold"
              onClick={() => navigate("/listProduk")}
            >
              Belanja Sekarang
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusStyles[order.status] || statusStyles["sedang diproses"];
              const totalItems = order.order_details?.reduce(
                (sum, d) => sum + d.jumlah,
                0,
              ) || 0;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Header Order */}
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">ID Pesanan</p>
                      <p className="text-sm font-mono font-semibold text-gray-900">
                        #{order.id.slice(0, 12)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${status.bg} ${status.text}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
                      {status.label}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="px-6 py-4 space-y-3">
                    {order.order_details?.map((detail) => (
                      <div
                        key={detail.id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={
                            detail.kain?.gambar
                              ? `http://localhost:3000${detail.kain.gambar}`
                              : ""
                          }
                          alt={detail.kain?.nama || "Produk"}
                          className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {detail.kain?.nama || "Produk"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {detail.jumlah} x {formatPrice(detail.harga_satuan)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(detail.subtotal)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer Order */}
                  <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      {totalItems} item •{" "}
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-base font-bold text-[#0665FE]">
                      {formatPrice(order.total_harga)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}