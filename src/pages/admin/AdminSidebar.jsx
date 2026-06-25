import React from "react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "produk", label: "Kelola Produk" },
    { key: "user", label: "Kelola User" },
    { key: "orderdetail", label: "Order Detail" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
              activeTab === t.key
                ? "bg-[#06FE9F] text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
