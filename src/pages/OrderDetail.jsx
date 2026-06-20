import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { FiArrowRight, FiCheckCircle, FiPrinter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OrderDetail() {
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const [orderItems, setOrderItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(orderItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [orderItems]);

  function increaseQuantity(id) {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
      )
    );
  }

  function decreaseQuantity(id) {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id && item.jumlah > 1
          ? { ...item, jumlah: item.jumlah - 1 }
          : item
      )
    );
  }

  function removeItem(id) {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  }

  const totalHarga = orderItems.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  async function handleBuatPesanan() {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!token || !user) {
        alert("Silakan login terlebih dahulu");
        navigate("/login");
        return;
      }

      setLoading(true);

      const items = orderItems.map((item) => ({
        fabric_id: item.id,
        jumlah: item.jumlah,
      }));

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          items: items,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setOrderId(result.data.id);
      setOrderSuccess(true);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      alert("Gagal membuat pesanan: " + error.message);
      setLoading(false);
    }
  }

  // Tampilan Sukses
  if (orderSuccess) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md">
          <FiCheckCircle className="w-16 h-16 text-[#06FE9F] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pesanan Berhasil!
          </h2>
          <p className="text-sm text-gray-500 mb-1">ID Pesanan</p>
          <p className="text-lg font-mono font-bold text-[#0665FE] mb-6">
            #{orderId.slice(0, 12)}
          </p>
          <p className="text-gray-500 mb-6">
            Pesanan Anda sedang diproses.
          </p>
          <Button
            className="bg-[#06FE9F] text-gray-900 font-semibold"
            onClick={() => navigate("/home")}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  // Tampilan Kosong
  if (orderItems.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md">
          <p className="text-gray-500 text-lg mb-4">Tidak ada item di pesanan</p>
          <Button
            className="bg-[#06FE9F] text-gray-900 font-semibold"
            onClick={() => navigate("/listProduk")}
          >
            Belanja Sekarang
          </Button>
        </div>
      </div>
    );
  }

  // Tampilan Struk
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Detail Pesanan
        </h1>
        <p className="text-gray-500 mb-8 text-center">
          Periksa kembali pesanan Anda
        </p>

        {/* STRUK */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          {/* Header Struk */}
          <div className="text-center border-b border-dashed border-gray-300 pb-4 mb-4">
            <p className="text-xl font-bold text-gray-900">BATIKNESIA</p>
            <p className="text-xs text-gray-400">www.batiknesia.com</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Daftar Item */}
          <div className="space-y-3 mb-4">
            {orderItems.map((item) => (
              <div key={item.id} className="border-b border-dashed border-gray-200 pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.nama}
                    </p>
                    <p className="text-xs text-gray-500">{item.kategori}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {formatPrice(item.harga * item.jumlah)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t-2 border-dashed border-gray-300 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-base font-bold text-gray-900">TOTAL</p>
              <p className="text-xl font-bold text-[#0665FE]">
                {formatPrice(totalHarga)}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">
              {orderItems.reduce((sum, item) => sum + item.jumlah, 0)} item
            </p>
          </div>

          {/* Footer Struk */}
          <div className="text-center mt-6 pt-4 border-t border-dashed border-gray-300">
            <p className="text-xs text-gray-400">Terima kasih telah berbelanja</p>
            <p className="text-xs text-gray-400">Lestarikan Budaya Indonesia</p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 bg-[#06FE9F] text-gray-900 font-semibold rounded-xl py-3"
            onClick={handleBuatPesanan}
            disabled={loading}
          >
            <FiCheckCircle className="w-5 h-5 mr-2" />
            {loading ? "Memproses..." : "Konfirmasi Pesanan"}
          </Button>
          <Button
            color="light"
            className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-3"
            onClick={() => navigate("/cart")}
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}
