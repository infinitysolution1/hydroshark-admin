"use client";
import React, { useEffect, useState } from "react";
import instance from "@/utils/instance";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import useStore from "@/utils/store";
import { MdDelete } from "react-icons/md";
import Spinner from "@/components/Spinner";

const labelClass = "text-black text-sm ";
const inputClass =
  "border border-black rounded-md p-1 text-black focus:outline-none";

const ProductImages = ({ productId, productImages }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(productImages);
  const [isPrimary, setIsPrimary] = useState(false);
  const { showCreateProductModal, setShowCreateProductModal } = useStore();

  const onDrop = (acceptedFiles) => {
    setLoading(true);
    console.log("acceptedFiles", acceptedFiles);
    const formData = new FormData();
    formData.append(`file`, acceptedFiles[0]);
    instance
      .post("/utils/file/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        console.log("res files", res.data);
        AddProductImages(res.data.id);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const AddProductImages = (id) => {
    setLoading(true);
    instance
      .post(`/drinks/product-image/`, {
        product: productId,
        image: id,
      })
      .then((res) => {
        setLoading(false);
        setShowCreateProductModal({
          ...showCreateProductModal,
          refresh: !showCreateProductModal.refresh,
        });
        console.log("res", res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const deleteProductImage = (id) => {
    setLoading(true);
    instance
      .patch(`/drinks/product-image/${id}/`, {
        is_deleted: true,
      })
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        setShowCreateProductModal({
          ...showCreateProductModal,
          refresh: !showCreateProductModal.refresh,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handlePrimaryImage = (id, value) => {
    setLoading(true);
    instance
      .patch(`/drinks/product-image/${id}/`, {
        is_primary: value,
      })
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        setShowCreateProductModal({
          ...showCreateProductModal,
          refresh: !showCreateProductModal.refresh,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (productImages && productImages.length > 0) {
      let primary = false;
      productImages.map((image) => {
        if (image.is_primary) {
          primary = true;
        }
      });
      setIsPrimary(primary);
    }
  }, [productImages]);

  if (loading) {
    return (
      <div className="flex flex-col h-[40vh] w-full justify-center items-center">
        <Spinner loading={loading} size={40} color={"#000000"} />
        <p className="text-base mt-2 text-black">Loading Product Data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mt-4">
      <label className={`${labelClass}`} htmlFor="productImage">
        Product Images
      </label>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-full mt-2 h-[10vh] border-[1px] border-gray-500 rounded-xl border-dashed text-gray-500 bg-gray-50 flex flex-col justify-center items-center"
      >
        <input {...getInputProps()} />
        <MdOutlineFileUpload className="text-gray-500" />
        <p>{"Drag 'n' drop some files here, or click to select files"}</p>
      </div>
      <div className="flex flex-wrap gap-4 w-full mt-4">
        {files.map((file, index) => {
          return (
            <div
              key={index}
              className=" flex flex-col items-start border-[1px] border-[#c7c7c7] rounded-md"
            >
              <div className="relative w-[200px] h-[200px] mr-4">
                <Image
                  src={file.image.cloudfront}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className=" flex flex-row justify-between w-full items-center px-2 mt-2">
                <p className="text-black text-sm">
                  {file.image.original_file_name.length > 15
                    ? file.image.original_file_name.slice(0, 12) + "..."
                    : file.image.original_file_name}
                </p>
                <button
                  onClick={() => {
                    deleteProductImage(file.id);
                  }}
                >
                  <MdDelete className="text-red-500" />
                </button>
              </div>
              {file.is_primary || !isPrimary ? (
                <div className=" flex flex-row justify-start gap-x-2 mt-2 w-full items-center px-2">
                  <input
                    type={"checkbox"}
                    checked={file.is_primary}
                    onChange={(e) => {
                      handlePrimaryImage(file.id, e.target.checked);
                    }}
                  />
                  <label className="text-black text-sm">primary Image</label>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
