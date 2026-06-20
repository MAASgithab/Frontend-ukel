export default function TentangSection() {
  return (
    <section id="tentang" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Tentang Batiknesia
            </h2>
            <div className="w-16 h-1 bg-[#06FE9F] rounded-full mt-4 mx-auto lg:mx-0"></div>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed">
              Batiknesia hadir untuk membantu pelestarian budaya Indonesia dengan
              menghubungkan pengrajin kain tradisional langsung kepada pelanggan
              melalui platform digital modern.
            </p>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Kami percaya bahwa setiap kain tradisional Indonesia memiliki
              cerita dan nilai budaya yang tinggi. Melalui Batiknesia, kami
              berkomitmen untuk menjaga warisan nenek moyang agar tetap lestari
              dan dapat diakses oleh seluruh masyarakat Indonesia.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-[#0665FE]">500+</p>
                <p className="text-sm text-gray-500 mt-1">Pengrajin</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0665FE]">10K+</p>
                <p className="text-sm text-gray-500 mt-1">Produk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}