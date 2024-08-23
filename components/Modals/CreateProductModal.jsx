"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import { useForm, useFieldArray, set, get } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import instance from "@/utils/instance";
import Spinner from "../Spinner";

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

const labelClass = "text-black text-lg ";
const inputClass =
  "border border-black rounded-md p-1 text-black focus:outline-none";

const CreateProductModal = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { showCreateProductModal, setShowCreateProductModal } = useStore();
  const [productSubSections, setProductSubSections] = useState([]);
  const [newProductSubSections, setNewProductSubSections] = useState([]);
  const [productData, setProductData] = useState({});

  const onDrop = (acceptedFiles) => {
    setValue("productImage", acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const {
    fields: fields1,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    control: control,
    name: "productSubSections",
  });

  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control: control,
    name: "newProductSubSections",
  });

  useEffect(() => {
    setIsOpen(showCreateProductModal.show);
  }, [showCreateProductModal]);

  const handleModalClose = () => {
    setShowCreateProductModal({ show: false, id: "" });
    reset(defaultValues);
    setIsOpen(false);
  };

  const CreateProductSection = (index) => {
    let obj = {
      linked_product: productData.id,
      section_title: parseInt(
        getValues(`newProductSubSections.${index}.section_title`)
      ),
      price: parseInt(getValues(`newProductSubSections.${index}.price`)),
      discounted_amount: parseInt(
        getValues(`newProductSubSections.${index}.discounted_amount`)
      ),
      discount_percentage: parseInt(
        getValues(`newProductSubSections.${index}.discount_percentage`)
      ),
    };

    setLoading(true);
    instance
      .post("/drinks/product-section/", obj)
      .then((res) => {
        setLoading(false);
        getProducts(productData.id);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const getProducts = (id) => {
    setLoading(true);
    instance
      .get(`/drinks/product/${id}/`)
      .then((res) => {
        setLoading(false);
        setProductData("res", res.data);
        setProductSubSections(res.data.product_sections);
        setValue("productName", res.data.product_title);
        setValue("productDescription", res.data.product_description);

        res.data.product_sections.map((item, index) => {
          setValue(
            `productSubSections.${index}.section_title`,
            item.section_title
          );
          setValue(`productSubSections.${index}.price`, item.price);
          setValue(
            `productSubSections.${index}.discounted_amount`,
            item.discounted_amount
          );
          setValue(
            `productSubSections.${index}.discount_percentage`,
            item.discount_percentage
          );
          setValue(`productSubSections.${index}.in_stock`, item.in_stock);
        });
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const createProduct = () => {
    setLoading(true);
    let obj = {
      product_title: "Product #" + Math.floor(Math.random() * 1000),
      product_description: "Product Description",
      hydroshark_points_accepted: false,
    };

    instance
      .post("/drinks/product/", obj)
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        getProducts(res.data.id);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (showCreateProductModal.mode == "edit") {
      getProducts(showCreateProductModal.id);
    }
    if (showCreateProductModal.mode == "create") {
      createProduct();
    }
  }, [showCreateProductModal]);

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-50 inset-0 flex items-center justify-center bg-black/30`}
    >
      <div className="bg-white w-8/12 max-h-[80vh] overflow-y-scroll py-6 px-8 rounded-md flex flex-col ">
        {loading ? (
          <div className=" h-[50vh] relative flex flex-col items-center justify-center w-full">
            <Spinner loading={loading} />
          </div>
        ) : (
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
                  {/* <div className="flex flex-col w-full mt-2">
                    <label
                      className={`${labelClass}`}
                      htmlFor="productCategory"
                    >
                      Product Category
                    </label>
                    <input
                      type="text"
                      id="productCategory"
                      {...register("productCategory", { required: true })}
                      className={`${inputClass}`}
                    />
                    {errors.productCategory && (
                      <p className="text-red-500">
                        Product Category is required
                      </p>
                    )}
                  </div> */}
                </div>

                <div className="flex flex-col w-full mt-4">
                  <label
                    className={`${labelClass}`}
                    htmlFor="productDescription"
                  >
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
              </form>
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
                          htmlFor="section_title"
                        >
                          Product Section Title
                        </label>
                        <input
                          type="text"
                          id="section_title"
                          {...register(
                            `productSubSections.${index}.section_title`,
                            { required: true }
                          )}
                          className={`${inputClass}`}
                        />
                        {errors.section_title && (
                          <p className="text-red-500">
                            Product Name is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label className={`${labelClass}`} htmlFor="price">
                          Original Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          {...register(`productSubSections.${index}.price`, {
                            required: true,
                          })}
                          className={`${inputClass}`}
                        />
                        {errors.price && (
                          <p className="text-red-500">
                            Original Price is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="discounted_amount"
                        >
                          Discounted Price
                        </label>
                        <input
                          type="number"
                          id="discounted_amount"
                          {...register(
                            `productSubSections.${index}.discounted_amount`,
                            { required: true }
                          )}
                          className={`${inputClass} `}
                        />
                        {errors.discounted_amount && (
                          <p className="text-red-500">
                            Discounted Price is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="discount_percentage"
                        >
                          Discount Percent
                        </label>
                        <input
                          type="text"
                          id="discount_percentage"
                          {...register(
                            `productSubSections.${index}.discount_percentage`,
                            { required: true }
                          )}
                          className={`${inputClass}`}
                        />
                        {errors.discount_percentage && (
                          <p className="text-red-500">
                            Discount Percentage is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row w-full items-center">
                        <input
                          type="checkbox"
                          id="in_stock"
                          {...register(`productSubSections.${index}.in_stock`, {
                            required: true,
                          })}
                          className={`${inputClass} text-4xl h-4 w-4 `}
                        />
                        <label
                          className={`${labelClass} ml-2`}
                          htmlFor="in_stock"
                        >
                          Item in stock
                        </label>
                      </div>
                      <div className=" flex flex-row justify-end w-full mt-4 gap-x-4">
                        <button
                          onClick={() => {
                            handleSectionDelete(index);
                          }}
                          className="border-[1px]  border-red-400 text-red-400 bg-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-md">
                          Add
                        </button>
                      </div>
                    </form>
                  );
                })}

                {newProductSubSections.map((item, index) => {
                  return (
                    <form
                      key={index}
                      className=" w-full grid grid-cols-2 gap-4 items-start bg-gray-100 mt-2 p-4"
                    >
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="section_title"
                        >
                          Product Section Title
                        </label>
                        <input
                          type="text"
                          id="section_title"
                          {...register(
                            `newProductSubSections.${index}.section_title`,
                            { required: true }
                          )}
                          className={`${inputClass}`}
                        />
                        {errors.section_title && (
                          <p className="text-red-500">
                            Product Name is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label className={`${labelClass}`} htmlFor="price">
                          Original Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          {...register(`newProductSubSections.${index}.price`, {
                            required: true,
                          })}
                          className={`${inputClass}`}
                        />
                        {errors.price && (
                          <p className="text-red-500">
                            Original Price is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="discounted_amount"
                        >
                          Discounted Price
                        </label>
                        <input
                          type="number"
                          id="discounted_amount"
                          {...register(
                            `newProductSubSections.${index}.discounted_amount`,
                            { required: true }
                          )}
                          className={`${inputClass} `}
                        />
                        {errors.discounted_amount && (
                          <p className="text-red-500">
                            Discounted Price is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <label
                          className={`${labelClass}`}
                          htmlFor="discount_percentage"
                        >
                          Discount Percent
                        </label>
                        <input
                          type="text"
                          id="discount_percentage"
                          {...register(
                            `newProductSubSections.${index}.discount_percentage`,
                            { required: true }
                          )}
                          className={`${inputClass}`}
                        />
                        {errors.discount_percentage && (
                          <p className="text-red-500">
                            Discount Percentage is required
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row w-full items-center">
                        <input
                          type="checkbox"
                          id="in_stock"
                          {...register(
                            `newProductSubSections.${index}.in_stock`,
                            {
                              required: true,
                            }
                          )}
                          className={`${inputClass} text-4xl h-4 w-4 `}
                        />
                        <label
                          className={`${labelClass} ml-2`}
                          htmlFor="in_stock"
                        >
                          Item in stock
                        </label>
                      </div>
                      <div className=" flex flex-row justify-end w-full mt-4 gap-x-4">
                        <button
                          onClick={() => {
                            setNewProductSubSections(
                              [...newProductSubSections].splice(index, 1)
                            );
                          }}
                          className="border-[1px]  border-red-400 text-red-400 bg-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            CreateProductSection(index);
                          }}
                          className="bg-black text-white px-4 py-2 rounded-md"
                        >
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
                      setNewProductSubSections([
                        ...newProductSubSections,
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProductModal;
