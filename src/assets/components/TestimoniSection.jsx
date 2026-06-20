import { Card, Avatar } from "flowbite-react";
import { testimonials } from "../../data/dummyData";
import { FiStar } from "react-icons/fi";

export default function TestimoniSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Testimoni Pelanggan
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Apa kata pelanggan kami tentang Batiknesia?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl shadow-sm border border-gray-100 bg-white"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar
                    img={item.photo}
                    rounded
                    size="md"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FiStar
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < item.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}