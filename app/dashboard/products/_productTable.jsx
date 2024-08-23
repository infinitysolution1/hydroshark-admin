"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoPencilSharp } from "react-icons/io5";
import instance from "@/utils/instance";
import Spinner from "@/components/Spinner";
import { MdEdit, MdDelete } from "react-icons/md";
import useStore from "@/utils/store";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import { IoFlash } from "react-icons/io5";
import { set } from "react-hook-form";

// Rest of the code...

const ProductDataTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { showCreateProductModal, setShowCreateProductModal } = useStore();

  const getProducts = () => {
    setLoading(true);
    instance
      .get("/drinks/product/")
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const deleteProduct = (id) => {
    setLoading(true);
    instance
      .patch(`/drinks/product/${id}/`, {
        is_deleted: true,
      })
      .then((res) => {
        console.log("res", res);
        getProducts();
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-[60vh] w-full justify-center items-center">
        <Spinner loading={loading} />
        <p className="text-base mt-2 text-black">Loading Product Data</p>
      </div>
    );
  }

  return (
    <div className="ag-theme-quartz flex flex-col  h-[70vh] overflow-y-scroll">
      {data.map((product) => {
        return (
          <div
            key={product.id}
            className="flex flex-row justify-between w-full items-center border-[0.5px] border-black/50 text-black p-4 rounded-md mb-4"
          >
            <div className=" flex flex-row justify-start items-center">
              <div className=" h-[5vh] w-[5vh] relative bg-gray-200 flex justify-center items-center rounded-md">
                <IoFlash className=" text-black" />
              </div>
              <div className="flex w-10/12 flex-col items-start ml-4">
                <p className="text-xl text-black">{product.product_title}</p>
                <p className=" text-sm text-black/70">
                  {product.product_description}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-x-2">
              <button
                onClick={() => {
                  setShowCreateProductModal({
                    show: true,
                    id: product.id,
                    mode: "edit",
                  });
                }}
                className="text-black py-2 rounded-md"
              >
                <MdEdit className="text-xl" />
              </button>
              <button className="text-red-400 py-2 rounded-md">
                <ConfirmDeleteModal
                  type="icon"
                  onConfirm={() => {
                    deleteProduct(product.id);
                  }}
                  title={product.product_title}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductDataTable;
