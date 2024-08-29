"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import ProductDataTable from "./_productTable";

const Products = () => {
  const { showCreateProductModal, setShowCreateProductModal } = useStore();

  return (
    <div className="w-full flex flex-col items-center h-full p-4">
      <div className=" flex flex-row justify-between w-full items-center">
        <p className=" text-2xl font-semibold text-black">Products</p>

        <button
          onClick={() => {
            setShowCreateProductModal({
              ...showCreateProductModal,
              show: true,
              id: "",
              mode: "create",
              refresh: !showCreateProductModal.refresh,
            });
          }}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>
      <div className="w-full flex flex-col max-h-[70vh] mt-4 ">
        <ProductDataTable />
      </div>
    </div>
  );
};

export default Products;
