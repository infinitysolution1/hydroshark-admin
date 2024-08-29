"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import instance from "@/utils/instance";
import { MdEdit, MdDelete } from "react-icons/md";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import useStore from "@/utils/store";

const defaultValues = {
  section_title: "",
  price: "",
  discounted_amount: "",
  discount_percentage: "",
  quantity: 0,
  hydroshark_points_on_purchase: 0,
  in_stock: true,
};

const labelClass = "text-black text-sm ";
const inputClass =
  "border border-black rounded-md p-1 text-black focus:outline-none";

const ProductSections = ({ productSections, productId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [mode, setMode] = useState("create");
  const { showCreateProductModal, setShowCreateProductModal } = useStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    if (mode === "create") {
      CreateProductSection(data);
    } else {
      UpdateProductSection(data);
    }
  };

  const CreateProductSection = (data) => {
    setLoading(true);
    instance
      .post("/drinks/product_section/", {
        ...data,
        price: parseInt(data.price),
        discounted_amount: parseInt(data.discounted_amount),
        discount_percentage: parseInt(data.discount_percentage),
        hydroshark_points_on_purchase: parseInt(
          data.hydroshark_points_on_purchase
        ),
        linked_product: productId,
      })
      .then((res) => {
        console.log("res", res);
        setShowCreateProductModal({
          ...showCreateProductModal,
          refresh: !showCreateProductModal.refresh,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const UpdateProductSection = (data) => {
    setLoading(true);
    instance
      .patch(`/drinks/product_section/${data.id}/`, {
        ...data,
        price: parseInt(data.price),
        discounted_amount: parseInt(data.discounted_amount),
        discount_percentage: parseInt(data.discount_percentage),
        hydroshark_points_on_purchase: parseInt(
          data.hydroshark_points_on_purchase
        ),
        linked_product: productId,
      })
      .then((res) => {
        console.log("res", res);
        setShowCreateProductModal({
          ...showCreateProductModal,
          refresh: !showCreateProductModal.refresh,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const deleteProductSection = (id) => {
    setLoading(true);
    instance
      .patch(`/drinks/product_section/${id}/`, {
        is_deleted: true,
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (productSections) {
      setData(productSections);
    }
  }, [productSections]);

  return (
    <div className=" w-full flex flex-col items-start">
      <div className=" flex flex-col items-start w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full grid grid-cols-2 gap-4 items-start bg-gray-100 mt-2 rounded-md p-4"
        >
          <div className="flex flex-col w-full mt-1">
            <label className={`${labelClass}`} htmlFor="section_title">
              Product Section Title
            </label>
            <input
              type="text"
              id="section_title"
              {...register(`section_title`, {
                required: true,
              })}
              className={`${inputClass}`}
            />
            {errors.section_title && (
              <p className="text-red-500 text-xs">Product Name is required</p>
            )}
          </div>
          <div className="flex flex-col w-full mt-1">
            <label className={`${labelClass}`} htmlFor="price">
              Original Price
            </label>
            <input
              type="number"
              id="price"
              {...register(`price`, {
                required: true,
              })}
              className={`${inputClass}`}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">Original Price is required</p>
            )}
          </div>
          <div className="flex flex-col w-full mt-1">
            <label className={`${labelClass}`} htmlFor="discounted_amount">
              Discounted Price
            </label>
            <input
              type="number"
              id="discounted_amount"
              {...register(`discounted_amount`, {
                required: true,
              })}
              className={`${inputClass} `}
            />
            {errors.discounted_amount && (
              <p className="text-red-500 text-xs">
                Discounted Price is required
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mt-1">
            <label className={`${labelClass}`} htmlFor="discount_percentage">
              Discount Percent
            </label>
            <input
              type="text"
              id="discount_percentage"
              {...register(`discount_percentage`, {
                required: true,
              })}
              className={`${inputClass}`}
            />
            {errors.discount_percentage && (
              <p className="text-red-500 text-xs">
                Discount Percentage is required
              </p>
            )}
          </div>

          <div className="flex flex-col w-full mt-1">
            <label className={`${labelClass}`} htmlFor="discount_percentage">
              Hydroshark Points
            </label>
            <input
              type="text"
              id="hydroshark_points_on_purchase"
              {...register(`hydroshark_points_on_purchase`, {
                required: true,
              })}
              className={`${inputClass}`}
            />
            {errors.hydroshark_points_on_purchase && (
              <p className="text-red-500 text-xs">
                Hydroshark Points is required
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mt-2"></div>
          <div className="flex flex-row w-full items-center">
            <input
              type="checkbox"
              id="in_stock"
              {...register(`in_stock`, {
                required: true,
              })}
              className={`${inputClass} text-4xl h-4 w-4 `}
            />
            <label className={`${labelClass} ml-2`} htmlFor="in_stock">
              Item in stock
            </label>
          </div>
          <div className=" flex flex-row justify-end w-full mt-4 gap-x-4">
            <button
              onClick={() => {
                if (mode === "edit") {
                  setMode("create");
                }
                reset(defaultValues);
              }}
              className="border-[1px]  border-red-400 text-red-400 bg-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              {mode ? "Update Section" : "Add Section"}
            </button>
          </div>
        </form>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-col w-full mt-4">
          <h3 className="text-black font-semibold text-lg">Product Sections</h3>
          <div className="flex flex-col w-full mt-2">
            {data.map((section, index) => (
              <div
                key={index}
                className="flex flex-row justify-between w-full items-center border-[0.5px] border-black/50 text-black px-4 py-2 rounded-md mb-4"
              >
                <div className=" flex flex-col items-start">
                  <p className=" text-xs text-black/70">Section Title</p>
                  <p className=" text-base text-black">
                    {section.section_title}
                  </p>
                </div>

                <div className=" flex flex-col items-start">
                  <p className=" text-xs text-black/70">Orginal Price</p>
                  <p className=" text-sm text-black">{section.price}/-</p>
                </div>
                <div className=" flex flex-col items-start">
                  <p className=" text-xs text-black/70">Discounted Price</p>
                  <p className=" text-sm text-black">
                    {section.discounted_amount}/-
                  </p>
                </div>
                <div className=" flex flex-col items-start">
                  <p className=" text-xs text-black/70">Discount</p>
                  <p className=" text-sm text-black">
                    {parseInt(section.discount_percentage)}%
                  </p>
                </div>
                <div className=" flex flex-col items-start px-2 py-1 bg-gray-200 rounded-md">
                  <p className=" text-xs text-black">
                    {section.in_stock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <div className=" flex flex-row justify-center items-center gap-x-4">
                  <button
                    onClick={() => {
                      setMode("edit");
                      setValue("section_title", section.section_title);
                      setValue("price", section.price);
                      setValue("discounted_amount", section.discounted_amount);
                      setValue(
                        "discount_percentage",
                        section.discount_percentage
                      );
                      setValue(
                        "hydroshark_points_on_purchase",
                        section.hydroshark_points_on_purchase
                      );
                      setValue("in_stock", section.in_stock);
                    }}
                    className="text-black py-2 rounded-md"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                  <ConfirmDeleteModal
                    type="icon"
                    onConfirm={() => {
                      deleteProductSection(section.id);
                    }}
                    title={section.section_title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductSections;
