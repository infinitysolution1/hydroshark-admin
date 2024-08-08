"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";

const defaultValues = {
  productName: "",
  productDescription: "",
  originalPrice: "",
  discountedPrice: "",
  productImage: "",
  productCategory: "",
  productQuantity: 0,
  hydrosharkPoints: 0,
};

// {
//   "product_id": 1,
//   "product_title": "Hydroshark Mango",
//   "product_description": "test descirption",
//   "hydroshark_points_accepted": false,
//   "product_sections": [
//     {
//       "product_section_id": 1,
//       "section_title": "Pack of 4",
//       "quantity": 12,
//       "original_price": 999,
//       "discount_percentage": "10%",
//       "discouted_amount": 901,
//       "in_stock": false
//     },
//     {
//       "product_section_id": 2,
//       "section_title": "Pack of 12",
//       "quantity": 12,
//       "original_price": 999,
//       "discount_percentage": "10%",
//       "discouted_amount": 901,
//       "in_stock": false
//     }
//   ],
//   "product_images": []
// }

const labelClass = "text-black text-lg ";
const inputClass =
  "border border-black rounded-md p-1 text-black focus:outline-none";

const CreateProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showCreateProductModal, setShowCreateProductModal } = useStore();
  const [productSubSections, setProductSubSections] = useState([]);

  const onDrop = (acceptedFiles) => {
    setValue("productImage", acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setIsOpen(showCreateProductModal.show);
  }, [showCreateProductModal]);

  const handleModalClose = () => {
    setShowCreateProductModal({ show: false, id: "" });
    reset(defaultValues);
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-50 inset-0 flex items-center justify-center bg-black/30`}
    >
      <div className="bg-white w-8/12 max-h-[80vh] overflow-y-scroll py-6 px-8 flex flex-col ">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-end ">
            <a
              onClick={() => {
                handleModalClose();
              }}
              className="cursor-pointer"
            >
              <IoMdClose className="text-black/60 text-2xl" />
            </a>
          </div>
          <div className=" w-full flex flex-col items-start">
            <p className=" text-black text-3xl font-semibold">{`${
              showCreateProductModal.mode == "create" ? "Create" : "Edit"
            } Product`}</p>

            <form className="flex flex-col w-full mt-4">
              <div className=" w-full grid grid-cols-2 gap-4">
                <div className="flex flex-col w-full mt-2">
                  <label className={`${labelClass}`} htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    {...register("productName", { required: true })}
                    className={`${inputClass}`}
                  />
                  {errors.productName && (
                    <p className="text-red-500">Product Name is required</p>
                  )}
                </div>
                <div className="flex flex-col w-full mt-2">
                  <label className={`${labelClass}`} htmlFor="productCategory">
                    Product Category
                  </label>
                  <input
                    type="text"
                    id="productCategory"
                    {...register("productCategory", { required: true })}
                    className={`${inputClass}`}
                  />
                  {errors.productCategory && (
                    <p className="text-red-500">Product Category is required</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full mt-4">
                <label className={`${labelClass}`} htmlFor="productDescription">
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  {...register("productDescription", { required: true })}
                  className={`${inputClass} h-[10vh]`}
                />
                {errors.productDescription && (
                  <p className="text-red-500">
                    Product Description is required
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full mt-4">
                <label className={`${labelClass}`} htmlFor="productDescription">
                  Product Component
                </label>

                {productSubSections.map((item, index) => {
                  return (
                    <form
                      key={index}
                      className=" w-full grid grid-cols-2 gap-4 items-start bg-gray-100 mt-2 p-4"
                    >
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="productName"
                        >
                          Product Sub-Section Title
                        </label>
                        <input
                          type="text"
                          id="productName"
                          {...register("productName", { required: true })}
                          className={`${inputClass}`}
                        />
                        {errors.productName && (
                          <p className="text-red-500">
                            Product Name is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="originalPrice"
                        >
                          Original Price
                        </label>
                        <input
                          type="number"
                          id="originalPrice"
                          {...register("originalPrice", { required: true })}
                          className={`${inputClass}`}
                        />
                        {errors.originalPrice && (
                          <p className="text-red-500">
                            Original Price is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="discountedPrice"
                        >
                          Discounted Price
                        </label>
                        <input
                          type="number"
                          id="discountedPrice"
                          {...register("discountedPrice", { required: true })}
                          className={`${inputClass} `}
                        />
                        {errors.discountedPrice && (
                          <p className="text-red-500">
                            Discounted Price is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="productName"
                        >
                          Discount Percent
                        </label>
                        <input
                          type="text"
                          id="productName"
                          {...register("productName", { required: true })}
                          className={`${inputClass}`}
                        />
                        {errors.productName && (
                          <p className="text-red-500">
                            Product Name is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row w-full mt-2">
                        <input
                          type="checkbox"
                          id="productName"
                          {...register("productName", { required: true })}
                          className={`${inputClass} text-2xl`}
                        />
                        <label
                          className={`${labelClass} ml-2`}
                          htmlFor="productName"
                        >
                          In Stock
                        </label>
                      </div>
                      <div className=" flex flex-row justify-end w-full mt-4 gap-x-4">
                        <button
                          onClick={() => {
                            handleModalClose();
                          }}
                          className="border-[1px]  border-red-400 text-red-400 bg-white px-4 py-2 rounded-md"
                        >
                          Cancel
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-md">
                          Add
                        </button>
                      </div>
                    </form>
                  );
                })}

                <div className=" w-full flex flex-col items-start mt-2">
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setProductSubSections([
                        ...productSubSections,
                        {
                          originalPrice: "",
                          discountedPrice: "",
                          productSectionTitle: "",
                          discountPercent: "",
                          inStock: false,
                        },
                      ]);
                    }}
                  >
                    Add Product Section
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4">
                <label className={`${labelClass}`} htmlFor="productImage">
                  Product Image
                </label>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className="w-full mt-2 h-[10vh] border-[1px] border-gray-500 rounded-xl border-dashed text-gray-500 bg-gray-50 flex flex-col justify-center items-center"
                >
                  <input {...getInputProps()} />
                  <MdOutlineFileUpload className="text-gray-500" />
                  <p>
                    {"Drag 'n' drop some files here, or click to select files"}
                  </p>
                </div>
                {errors.productImage && (
                  <p className="text-red-500">Product Image is required</p>
                )}
              </div>
              <div className=" flex flex-row justify-end w-full mt-4 gap-x-4">
                <button
                  onClick={() => {
                    handleModalClose();
                  }}
                  className="border-[1px]  border-red-400 text-red-400 bg-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md"
                >
                  {showCreateProductModal.mode == "create" ? "Create" : "Edit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
