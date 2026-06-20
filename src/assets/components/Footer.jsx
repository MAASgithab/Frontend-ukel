import { Footer as FlowbiteFooter } from "flowbite-react";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <FlowbiteFooter id="kontak" className="bg-gray-900 rounded-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#06FE9F] flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">B</span>
              </div>
              <span className="text-xl font-bold text-white">Batiknesia</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Platform jual beli kain tradisional Indonesia terpercaya.
              <br />
              Mendukung pelestarian budaya dan UMKM Nusantara.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-[#06FE9F]" />
                <span className="text-sm text-gray-400">
                  info@batiknesia.com
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-[#06FE9F]" />
                <span className="text-sm text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 text-[#06FE9F] mt-0.5" />
                <span className="text-sm text-gray-400">
                  Jakarta Selatan, Indonesia
                </span>
              </li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Ikuti Kami
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Batiknesia. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </FlowbiteFooter>
  );
}