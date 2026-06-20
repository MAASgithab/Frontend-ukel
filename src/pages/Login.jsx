import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login gagal");
      }

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      setLoading(false);

      if (result.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Masuk</h1>
          <p className="text-gray-500 mt-1">Masuk ke akun Batiknesia Anda</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#06FE9F] focus:ring-1 focus:ring-[#06FE9F] outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#06FE9F] text-gray-900 font-semibold py-2.5 rounded-xl disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#0665FE] font-medium">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
