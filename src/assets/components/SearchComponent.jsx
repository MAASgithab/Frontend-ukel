import React from "react";
import { TextInput } from "flowbite-react";
import { FiSearch } from "react-icons/fi";

export default function SearchProdukComponent({
  search,
  processSearch,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
      <TextInput
        type="text"
        placeholder="Cari produk..."
        icon={FiSearch}
        className="w-full"
        value={search}
        onChange={processSearch}
      />
    </div>
  );
}
