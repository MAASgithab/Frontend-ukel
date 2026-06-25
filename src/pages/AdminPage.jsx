import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import AdminSidebar from "./admin/AdminSidebar";
import AdminProductsTab from "./admin/AdminProductsTab";

import AdminOrderDetailTab from "../assets/components/AdminOrderDetailTab";
import AdminUserTab from "../assets/components/AdminUserTab";
import AdminProductModal from "../assets/components/AdminProductModal";
import AdminEditUserModal from "../assets/components/AdminEditUserModal";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("produk");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchProduk, setSearchProduk] = useState("");

  const [searchUser, setSearchUser] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formUser, setFormUser] = useState({
    nama: "",
    email: "",
    noTelp: "",
    alamat: "",
    roleId: 2,
  });

  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    lebar: "",
    kategori: "Batik",
    harga: "",
    stok: "",
    gambar: null,
  });

  const [kainList, setKainList] = useState([]);
  const [loadingKain, setLoadingKain] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [searchOrder, setSearchOrder] = useState("");

  const [userList, setUserList] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const filteredUsers = userList.filter((u) =>
    (u.nama || "").toLowerCase().includes((searchUser || "").toLowerCase()),
  );

  const filteredOrders = orderList.filter((o) =>
    (o.status || "").toLowerCase().includes((searchOrder || "").toLowerCase()),
  );

  function openAddModal() {
    setEditingProduct(null);
    setFormData({
      nama: "",
      deskripsi: "",
      lebar: "",
      kategori: "Batik",
      harga: "",
      stok: "",
      gambar: null,
    });
    setShowModal(true);
  }

  function openEditModal(kain) {
    setEditingProduct(kain);
    setFormData({
      nama: kain.nama,
      deskripsi: kain.deskripsi || "",
      lebar: kain.lebar.toString(),
      kategori: kain.kategori,
      harga: kain.harga.toString(),
      stok: kain.stok.toString(),
      gambar: null,
    });
    setShowModal(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setFormData((prev) => ({ ...prev, gambar: e.target.files[0] }));
  }

  function handleUserInputChange(e) {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      setLoadingSubmit(true);
      const form = new FormData();
      form.append("nama", formData.nama);
      form.append("deskripsi", formData.deskripsi);
      form.append("lebar", formData.lebar);
      form.append("kategori", formData.kategori);
      form.append("harga", formData.harga);
      form.append("stok", formData.stok);
      if (formData.gambar) {
        form.append("gambar", formData.gambar);
      }

      const response = await fetch("http://localhost:3000/kain", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Berhasil tambah kain:", result);
      setShowModal(false);
      setLoadingSubmit(false);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setLoadingSubmit(false);
    }
  }

  async function handleUpdateSubmit() {
    try {
      setLoadingSubmit(true);
      const form = new FormData();
      form.append("nama", formData.nama);
      form.append("deskripsi", formData.deskripsi);
      form.append("lebar", formData.lebar);
      form.append("kategori", formData.kategori);
      form.append("harga", formData.harga);
      form.append("stok", formData.stok);
      if (formData.gambar) {
        form.append("gambar", formData.gambar);
      }

      const response = await fetch(
        `http://localhost:3000/kain/${editingProduct.id}`,
        {
          method: "PUT",
          body: form,
        },
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Berhasil update kain:", result);

      // Update state lokal
      const updatedList = kainList.map((k) =>
        k.id === editingProduct.id ? result.data : k,
      );
      setKainList(updatedList);

      setShowModal(false);
      setLoadingSubmit(false);
    } catch (error) {
      console.error(error.message);
      setLoadingSubmit(false);
    }
  }

  async function handleUpdateUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nama: formUser.nama,
            email: formUser.email,
            no_telp: formUser.noTelp,
            alamat: formUser.alamat,
            role_id: Number(formUser.roleId),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      // Update state lokal
      const updatedUsers = userList.map((u) =>
        u.id === editingUser.id ? result.data : u,
      );
      setUserList(updatedUsers);

      setShowUserModal(false);
      console.log("User berhasil diupdate:", result);
    } catch (error) {
      console.error(error.message);
      alert("Gagal update user: " + error.message);
    }
  }

  async function getOrder() {
    try {
      setLoadingOrder(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setOrderList(result.data.data);
      setLoadingOrder(false);
    } catch (error) {
      console.error(error.message);
      setLoadingOrder(false);
    }
  }

  async function deleteOrder(id) {
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin menghapus order ini?",
    );
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setOrderList(orderList.filter((o) => o.id !== id));
      console.log("Order berhasil dihapus");
    } catch (error) {
      console.error(error.message);
      alert("Gagal menghapus order: " + error.message);
    }
  }

  async function updateStatusOrder(id, newStatus) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // Update state lokal
      const updatedOrders = orderList.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o,
      );
      setOrderList(updatedOrders);
      console.log("Status order berhasil diupdate");
    } catch (error) {
      console.error(error.message);
      alert("Gagal update status: " + error.message);
    }
  }

  // 🔹 Export data user ke Excel
  function exportUsersToExcel() {
    try {
      const dataRows = userList.map((user) => ({
        Nama: user.nama || "-",
        Email: user.email || "-",
        Role: user.role?.nama_role || "User",
        "No. Telepon": user.no_telp || "-",
        Alamat: user.alamat || "-",
        "Tanggal Daftar": new Date(user.createdAt).toLocaleDateString("id-ID"),
      }));

      if (dataRows.length === 0) {
        alert("Tidak ada data user untuk di-export");
        return;
      }

      const headers = Object.keys(dataRows[0]);

      // Buat worksheet dengan judul + header + data
      const ws = XLSX.utils.aoa_to_sheet([]);

      // Baris 1: Judul (merge A1:F1)
      ws["A1"] = { t: "s", v: "DATA USERS - BATIKNESIA" };
      ws["A1"].s = { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" } };
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];

      // Baris 2: Header
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A2" });
      const headerRow = ws["A2"];
      if (headerRow) {
        headerRow.s = { font: { bold: true }, alignment: { horizontal: "center" } };
      }

      // Baris 3+: Data
      const dataAoa = dataRows.map((row) => headers.map((h) => row[h]));
      XLSX.utils.sheet_add_aoa(ws, dataAoa, { origin: "A3" });

      // Set !ref secara manual agar border terpasang dengan benar
      const maxRow = 2 + dataAoa.length; // baris 1 judul, baris 2 header, sisanya data
      const maxCol = headers.length - 1;
      ws["!ref"] = `A1:${XLSX.utils.encode_col(maxCol)}${maxRow}`;

      // Border untuk semua cell yang terisi
      const range = XLSX.utils.decode_range(ws["!ref"]);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellAddress]) ws[cellAddress] = { v: "" };
          ws[cellAddress].s = {
            ...(ws[cellAddress].s || {}),
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          };
        }
      }

      // Set column width
      ws["!cols"] = headers.map((h) => ({ wch: Math.max(h.length, 18) }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, "Users");
      XLSX.writeFile(workbook, `users-batiknesia-${Date.now()}.xlsx`);
    } catch (error) {
      console.error("Gagal export Excel user:", error.message);
      alert("Gagal export data user: " + error.message);
    }
  }

  // 🔹 Export data order ke Excel
  function exportToExcel() {
    try {
      const dataRows = orderList.map((order) => {
        // Flat data per item dalam order
        return order.order_details?.map((detail) => ({
          "ID Order": order.id.slice(0, 12),
          Customer: order.user?.nama || "-",
          "No. Telepon": order.user?.no_telp || "-",
          Produk: detail.kain?.nama || "Produk",
          Jumlah: detail.jumlah,
          "Harga Satuan": parseInt(detail.harga_satuan || 0).toLocaleString("id-ID"),
          Subtotal: parseInt(detail.subtotal || 0).toLocaleString("id-ID"),
          "Total Harga": parseInt(order.total_harga).toLocaleString("id-ID"),
          Status: order.status,
          Tanggal: new Date(order.createdAt).toLocaleDateString("id-ID"),
        }));
      }).flat();

      if (dataRows.length === 0) {
        alert("Tidak ada data order untuk di-export");
        return;
      }

      const headers = Object.keys(dataRows[0]);

      // Buat worksheet dengan judul + header + data
      const ws = XLSX.utils.aoa_to_sheet([]);

      // Baris 1: Judul (merge A1:J1)
      ws["A1"] = { t: "s", v: "DATA ORDERS - BATIKNESIA" };
      ws["A1"].s = { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" } };
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }];

      // Baris 2: Header
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A2" });
      const headerRow = ws["A2"];
      if (headerRow) {
        headerRow.s = { font: { bold: true }, alignment: { horizontal: "center" } };
      }

      // Baris 3+: Data
      const dataAoa = dataRows.map((row) => headers.map((h) => row[h]));
      XLSX.utils.sheet_add_aoa(ws, dataAoa, { origin: "A3" });

      // Set !ref secara manual agar border terpasang dengan benar
      const maxRow = 2 + dataAoa.length; // baris 1 judul, baris 2 header, sisanya data
      const maxCol = headers.length - 1;
      ws["!ref"] = `A1:${XLSX.utils.encode_col(maxCol)}${maxRow}`;

      // Border untuk semua cell yang terisi
      const range = XLSX.utils.decode_range(ws["!ref"]);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellAddress]) ws[cellAddress] = { v: "" };
          ws[cellAddress].s = {
            ...(ws[cellAddress].s || {}),
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          };
        }
      }

      // Set column width
      ws["!cols"] = headers.map((h) => ({ wch: Math.max(h.length, 18) }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, "Orders");
      XLSX.writeFile(workbook, `orders-batiknesia-${Date.now()}.xlsx`);
    } catch (error) {
      console.error("Gagal export Excel:", error.message);
      alert("Gagal export data: " + error.message);
    }
  }

  // 🔹 Admin klik checklist → finalize order (potong stok)
  async function finalizeOrder(id) {
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin mengkonfirmasi pengiriman order ini? Stok akan dipotong.",
    );
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/orders/${id}/finalize`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      alert("Pesanan berhasil dikonfirmasi! Stok telah dipotong.");
      getOrder();
    } catch (error) {
      console.error(error.message);
      alert("Gagal finalize order: " + error.message);
    }
  }

  async function getUser() {
    try {
      setLoadingUser(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setUserList(result.data.data);
      setLoadingUser(false);
    } catch (error) {
      console.error(error.message);
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (activeTab === "orderdetail") {
      getOrder();
    }
  }, [activeTab]);

  async function getKain() {
    try {
      setLoadingKain(true);
      const response = await fetch("http://localhost:3000/kain");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setKainList(result.data.data);
      setLoadingKain(false);
    } catch (error) {
      console.error(error.message);
      setLoadingKain(false);
    }
  }

  async function deleteKain(id) {
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?",
    );
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:3000/kain/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setKainList(kainList.filter((k) => k.id !== id));
      console.log("Produk berhasil dihapus");
    } catch (error) {
      console.error(error.message);
      alert("Gagal menghapus produk: " + error.message);
    }
  }

  useEffect(() => {
    getKain();
  }, []);

  function openEditUserModal(user) {
    setEditingUser(user);
    setFormUser({
      nama: user.nama,
      email: user.email,
      noTelp: user.no_telp || "",
      alamat: user.alamat || "",
      roleId: user.role_id,
    });
    setShowUserModal(true);
  }

  async function deleteUser(id) {
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?",
    );
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setUserList(userList.filter((u) => u.id !== id));
      console.log("User berhasil dihapus");
    } catch (error) {
      console.error(error.message);
      alert("Gagal menghapus user: " + error.message);
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {activeTab === "produk"
              ? "Kelola Produk (Kain)"
              : activeTab === "orderdetail"
                ? "Order Detail"
                : "Kelola User"}
          </h1>

          {activeTab === "produk" && (
            <AdminProductsTab
              searchProduk={searchProduk}
              setSearchProduk={setSearchProduk}
              kainList={kainList}
              loadingKain={loadingKain}
              openAddModal={openAddModal}
              openEditModal={openEditModal}
              deleteKain={deleteKain}
            />
          )}

          {activeTab === "orderdetail" && (
            <AdminOrderDetailTab
              searchOrder={searchOrder}
              setSearchOrder={setSearchOrder}
              orderList={orderList}
              loadingOrder={loadingOrder}
              filteredOrders={filteredOrders}
              updateStatusOrder={updateStatusOrder}
              finalizeOrder={finalizeOrder}
              deleteOrder={deleteOrder}
              exportToExcel={exportToExcel}
            />
          )}

          {activeTab === "user" && (
            <AdminUserTab
              searchUser={searchUser}
              setSearchUser={setSearchUser}
              userList={userList}
              loadingUser={loadingUser}
              filteredUsers={filteredUsers}
              openEditUserModal={openEditUserModal}
              deleteUser={deleteUser}
              exportUsersToExcel={exportUsersToExcel}
            />
          )}
        </div>
      </div>

      <AdminProductModal
        showModal={showModal}
        editingProduct={editingProduct}
        formData={formData}
        loadingSubmit={loadingSubmit}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleClose={() => setShowModal(false)}
        onSubmit={editingProduct ? handleUpdateSubmit : handleSubmit}
      />

      <AdminEditUserModal
        showUserModal={showUserModal}
        formUser={formUser}
        loadingSubmit={loadingSubmit}
        handleUserInputChange={handleUserInputChange}
        handleClose={() => setShowUserModal(false)}
        onSave={handleUpdateUser}
      />
    </div>
  );
}