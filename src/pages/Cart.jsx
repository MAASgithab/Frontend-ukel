import React, { useState, useEffect } from "react";
import { Card, Button } from "flowbite-react";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  function increaseQuantity(id) {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.jumlah > 1
          ? { ...item, jumlah: item.jumlah - 1 }
          : item
      )
    );
  }

  function removeItem(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keranjang</h1>
        <p className="text-gray-500 mb-8">
          {cartItems.length} item di keranjang Anda
        </p>

        {/* Daftar Item Keranjang */}
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">Keranjang belanja kosong</p>
              <Button
                className="mt-4 bg-[#06FE9F] text-white font-semibold"
                onClick={() => navigate("/listProduk")}
              >
                Belanja Sekarang
              </Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2">
                    {/* Gambar */}
                    <img
                      src={`http://localhost:3000${item.gambar}`}
                      alt={item.nama}
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    {/* Info Produk */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white">
                        {item.nama}
                      </h3>
                      <p className="text-sm text-gray-500">{item.kategori}</p>
                      <p className="text-base font-bold text-[#0665FE] mt-1">
                        {formatPrice(item.harga)}
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600"
                      >
                        <FiMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-base font-semibold text-white w-8 text-center">
                        {item.jumlah}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal & Hapus */}
                    <div className="text-right">
                      <p className="text-base font-bold text-white">
                        {formatPrice(item.harga * item.jumlah)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 text-red-500 text-sm flex items-center gap-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Tombol Beli */}
              <div className="flex justify-end pt-4">
                <Button
                  className="bg-[#06FE9F] text-white font-semibold rounded-xl px-8 py-3 text-base"
                  onClick={() => navigate("/orderdetail")}
                >
                  <FiShoppingBag className="w-5 h-5 mr-2" />
                  Beli
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
