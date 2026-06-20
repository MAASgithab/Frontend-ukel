import React from "react";
import { Pagination } from "flowbite-react";

export default function PaginationProdukComponent({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
