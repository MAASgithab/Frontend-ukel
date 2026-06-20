import React, { useState } from "react";
import { Card, Button } from "flowbite-react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Checkout() {
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

  const totalHarga = cartItems.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  function handleBuatPesanan() {
    setOrderSuccess(true);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }

  if (orderSuccess) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md">
          <FiCheckCircle className="w-16 h-16 text-[#06FE9F] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pesanan Berhasil!
          </h2>
          <p className="text-gray-500 mb-6">
            Pesanan Anda sedang diproses. Kami akan mengirimkan notifikasi
            melalui email.
          </p>
          <Button
            className="bg-[#06FE9F] text-gray-900 font-semibold items-center mx-auto"
            onClick={() => navigate("/home")}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md">
          <p className="text-gray-500 text-lg mb-4">Tidak ada item untuk checkout</p>
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

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="space-y-6">
          {/* Daftar Produk */}
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Produk Dipesan
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <img
                      src={`http://localhost:3000${item.gambar}`}
                      alt={item.nama}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.nama}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.jumlah} x {formatPrice(item.harga)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.harga * item.jumlah)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <div className="p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Harga</p>
                  <p className="text-2xl font-bold text-[#0665FE]">
                    {formatPrice(totalHarga)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {cartItems.length} item
                  </p>
                </div>
                <Button
                  className="bg-[#06FE9F] text-gray-900 font-semibold rounded-xl px-8 py-3 text-base"
                  onClick={handleBuatPesanan}
                >
                  Buat Pesanan
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
