import { Button } from "flowbite-react";
import { backgroundImage } from "flowbite-react/plugin/tailwindcss/theme";
import React from "react";

export default function BannerPromo() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/Untitled design.png')",
          }}
        >
          {/* Overlay gelap */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Konten */}
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Diskon hingga 20% untuk koleksi kain tradisional pilihan.
              </h2>
              <p className="mt-4 text-gray-200 text-base sm:text-lg">
                Dapatkan penawaran terbaik untuk kain batik, tenun, dan songket
                pilihan.
              </p>
              <div className="mt-6">
                <Button className="bg-[#06FE9F] text-gray-900 font-semibold px-8 py-3 rounded-xl text-base">
                  Lihat Promo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
