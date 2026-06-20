import React, { useState, useEffect } from "react";
import CardProdukComponent from "../assets/components/CardE-commerce";
import SearchProdukComponent from "../assets/components/SearchComponent";
import PaginationProdukComponent from "../assets/components/PaginationComponent";

export default function ListProduk() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function getData(url = "http://localhost:3000/kain?page=1&limit=8") {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result.data.data);
      setTotalPages(result.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }

  function processSearch(event) {
    const newSearch = event.target.value;
    setSearch(newSearch);
    setCurrentPage(1);
    const url =
      newSearch === ""
        ? "http://localhost:3000/kain?page=1&limit=8"
        : `http://localhost:3000/kain?search=${newSearch}&page=1&limit=8`;
    getData(url);
  }

  function onPageChange(page) {
    setCurrentPage(page);
    const url =
      search === ""
        ? `http://localhost:3000/kain?page=${page}&limit=8`
        : `http://localhost:3000/kain?search=${search}&page=${page}&limit=8`;
    getData(url);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Semua Produk
        </h1>

        <div className="flex justify-center mb-8">
          <SearchProdukComponent
            search={search}
            processSearch={processSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Memuat data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <CardProdukComponent key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <PaginationProdukComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
