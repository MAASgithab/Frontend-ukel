import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  TextInput,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiUser, FiLogOut, FiPackage } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.jumlah, 0);
      setCartCount(total);
    }

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  }

  return (
    <Navbar
      fluid
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm"
    >
      <NavbarBrand as={Link} to="/home">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-2">
          <span className="text-xl font-bold text-[#06FE9F]">B</span>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          Batiknesia
        </span>
      </NavbarBrand>

      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink href="/home" className="text-gray-700 font-medium">
          Beranda
        </NavbarLink>
        <NavbarLink href="/listProduk" className="text-gray-700 font-medium">
          Produk
        </NavbarLink>
        <NavbarLink href="/home#tentang" className="text-gray-700 font-medium">
          Tentang Kami
        </NavbarLink>
      </NavbarCollapse>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-700 mr-2">
              <FiUser className="w-4 h-4" />
              <span className="font-medium">{user.nama}</span>
            </div>
            <Link to="/pesanan-saya">
              <Button
                color="light"
                className="border border-gray-200 text-gray-700"
              >
                <FiPackage className="w-4 h-4 mr-1" />
                Pesanan
              </Button>
            </Link>
            <Button
              color="light"
              className="border border-gray-200 text-gray-700"
              onClick={handleLogout}
            >
              <FiLogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                color="light"
                className="border border-gray-200 text-gray-700"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#06FE9F] text-white font-semibold">
                Daftar
              </Button>
            </Link>
          </>
        )}
        <Link to="/cart" className="relative p-2 text-white">
          <FiShoppingCart className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 bg-[#0665FE] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </Link>
      </div>
    </Navbar>
  );
}
