import React from "react";
import { Card, Button } from "flowbite-react";
import { FiShoppingCart } from "react-icons/fi";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CardProdukComponent({ product }) {
  function addToCart() {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].jumlah += 1;
    } else {
      existingCart.push({
        id: product.id,
        nama: product.nama,
        harga: product.harga,
        gambar: product.gambar,
        kategori: product.kategori,
        jumlah: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.nama} berhasil ditambahkan ke keranjang!`);
  }

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100">
      <img
        src={`http://localhost:3000${product.gambar}`}
        alt={product.nama}
        className="h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <span className="text-xs text-[#0665FE] font-medium">
          {product.kategori}
        </span>
        <h3 className="text-base font-semibold text-gray-900 mt-1">
          {product.nama}
        </h3>
        <p className="text-sm text-gray-500">Lebar: {product.lebar} cm</p>
        <p className="text-lg font-bold text-[#0665FE] mt-2">
          {formatPrice(product.harga)}
        </p>
        <div className="flex gap-2 mt-4">
          <Button size="sm" color="light" className="flex-1 rounded-xl">
            Detail
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-[#06FE9F] text-gray-900 font-semibold rounded-xl"
            onClick={addToCart}
          >
            <FiShoppingCart className="w-4 h-4 mr-1" />
            Keranjang
          </Button>
        </div>
      </div>
    </Card>
  );
}
