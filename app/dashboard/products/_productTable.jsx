"use client";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FiTrash2 } from "react-icons/fi";
import { IoPencilSharp } from "react-icons/io5";

const data = [
  {
    productName: "Product 1",
    productDescription: "Description 1",
    originalPrice: "10",
    discountedPrice: "8",
    productImage: "image1.jpg",
    productCategory: "Category 1",
    productQuantity: 5,
    hydrosharkPoints: 100,
  },
  {
    productName: "Product 2",
    productDescription: "Description 2",
    originalPrice: "20",
    discountedPrice: "15",
    productImage: "image2.jpg",
    productCategory: "Category 2",
    productQuantity: 10,
    hydrosharkPoints: 200,
  },
  {
    productName: "Product 3",
    productDescription: "Description 3",
    originalPrice: "30",
    discountedPrice: "25",
    productImage: "image3.jpg",
    productCategory: "Category 3",
    productQuantity: 15,
    hydrosharkPoints: 300,
  },
  {
    productName: "Product 4",
    productDescription: "Description 4",
    originalPrice: "40",
    discountedPrice: "35",
    productImage: "image4.jpg",
    productCategory: "Category 4",
    productQuantity: 20,
    hydrosharkPoints: 400,
  },
  {
    productName: "Product 5",
    productDescription: "Description 5",
    originalPrice: "50",
    discountedPrice: "45",
    productImage: "image5.jpg",
    productCategory: "Category 5",
    productQuantity: 25,
    hydrosharkPoints: 500,
  },
];

// Rest of the code...

const columns = [
  {
    headerName: "Product Name",
    field: "productName",
  },
  {
    headerName: "Original Price",
    field: "originalPrice",
    width: 120,
  },
  {
    headerName: "Discounted Price",
    field: "discountedPrice",
    width: 120,
  },
  {
    headerName: "Product Image",
    field: "productImage",
    width: 150,
  },
  {
    headerName: "Product Category",
    field: "productCategory",
    width: 180,
  },
  {
    headerName: "Product Quantity",
    field: "productQuantity",
    width: 120,
  },
  {
    headerName: "Hydroshark Points",
    field: "hydrosharkPoints",
    width: 120,
  },
  {
    headerName: "Actions",
    field: "action",
    width: 80,
    cellRenderer: (params) => {
      return (
        <div className="flex flex-row group justify-center items-center h-full gap-x-2">
          <button className="text-red-400 group-hover:text-red-400/80">
            <FiTrash2 size={20} />
          </button>
          <button className="text-black/60 group-hover:text-black/80">
            <IoPencilSharp size={20} />
          </button>
        </div>
      );
    },
  },
];

const ProductDataTable = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col h-[70vh] w-full justify-center items-center">
        <p className="text-sm mt-2 text-purple-400">Loading user Data</p>
      </div>
    );
  }

  return (
    <div
      className="ag-theme-quartz flex flex-col  h-[70vh] overflow-y-scroll" // applying the grid theme
    >
      <AgGridReact rowData={data} columnDefs={columns} />
    </div>
  );
};

export default ProductDataTable;
