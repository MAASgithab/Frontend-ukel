import { Button } from "flowbite-react";

export default function HeroSection() {
  return (
    <section id="beranda" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Lestarikan Budaya Indonesia Melalui{" "}
            <div className="bg-black">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #EF4444 50%, #FFFFFF 50%)",
                }}
              >
                Kain Tradisional
              </span>
            </div>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Temukan berbagai kain tradisional asli dari pengrajin terbaik
            Nusantara.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button className="!bg-[#06FE9F] text-gray-900 font-semibold px-8 py-3 text-base rounded-xl">
              Belanja Sekarang
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/Hero Section.png"
                alt="Kain Tradisional Indonesia"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#06FE9F] rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">100% Asli</p>
                <p className="text-xs text-gray-500">Pengrajin Lokal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
