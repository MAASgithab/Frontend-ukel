import { Card } from "flowbite-react";
import { FiPackage, FiTruck, FiShield, FiHeart } from "react-icons/fi";

const advantages = [
  {
    icon: FiPackage,
    title: "Produk Asli Pengrajin Lokal",
    description:
      "Semua kain dijamin keasliannya langsung dari pengrajin terpercaya di seluruh Indonesia.",
    color: "#06FE9F",
  },
  {
    icon: FiTruck,
    title: "Pengiriman Seluruh Indonesia",
    description:
      "Kami melayani pengiriman ke seluruh wilayah Indonesia dengan packaging aman.",
    color: "#06E1FE",
  },
  {
    icon: FiShield,
    title: "Pembayaran Aman",
    description:
      "Transaksi aman dan terpercaya dengan berbagai metode pembayaran yang tersedia.",
    color: "#0665FE",
  },
  {
    icon: FiHeart,
    title: "Dukungan UMKM Nusantara",
    description:
      "Setiap pembelian Anda mendukung langsung UMKM dan pengrajin lokal Indonesia.",
    color: "#06FE9F",
  },
];

export default function KeunggulanSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Keunggulan Batiknesia
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Mengapa membeli kain tradisional di Batiknesia?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-sm border border-gray-100 bg-white text-center items-center"
            >
              <div className="p-6 pb-2">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon
                    className="w-7 h-7"
                    style={{ color: item.color }}
                  />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}