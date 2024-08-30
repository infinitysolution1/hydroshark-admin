"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import instance from "@/utils/instance";
import { FaFileAlt } from "react-icons/fa";

import Spinner from "../Spinner";
import * as dayjs from "dayjs";
dayjs().format();

const labelClass = "text-black text-sm ";
const inputClass =
  "border border-black rounded-md p-1 text-black focus:outline-none";

const ViewOrderDetailsModal = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { showOrderDetailsModal, setShowOrderDetailsModal } = useStore();
  const [orderDetails, setOrderDetails] = useState({});

  const getOrderDetials = (id) => {
    setLoading(true);
    instance
      .get(`/admin/orders/${id}/`)
      .then((res) => {
        setOrderDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setIsOpen(showOrderDetailsModal.show);
    if (showOrderDetailsModal.show) {
      getOrderDetials(showOrderDetailsModal.id);
    }
  }, [showOrderDetailsModal.show]);

  const handleModalClose = () => {
    setShowOrderDetailsModal({ show: false, id: "" });
    setIsOpen(false);
  };

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
            <div className="flex flex-row justify-between items-center w-full">
              <h3 className="text-black text-2xl font-bold">Order Details</h3>
              <IoMdClose
                onClick={() => handleModalClose()}
                className="text-black text-2xl cursor-pointer"
              />
            </div>
            <div className="bg-gray-100 w-full mt-4 py-2 px-4 rounded-md grid grid-cols-3">
              <div className=" flex flex-col items-start">
                <p className=" text-xs text-black/70">Order ID</p>
                <p className=" text-base text-black">{`Order# ${orderDetails.id}`}</p>
              </div>

              <div className=" flex flex-col items-start">
                <p className=" text-xs text-black/70">Order Date</p>
                <p className=" text-base text-black">
                  {dayjs(orderDetails.created_at).format(
                    "hh:MM A , DD/MM/YYYY "
                  )}
                </p>
              </div>

              <div className=" flex flex-col items-start">
                <p className=" text-xs text-black/70">Order Total</p>
                <p className=" text-base text-black">
                  {orderDetails.order_total_amount}
                </p>
              </div>
            </div>
            <div className=" bg-gray-100  py-2 px-4 rounded-md flex mt-4 flex-col items-start w-full">
              <p className=" text-base text-black font-semibold">
                Payment Details
              </p>
              <div className=" w-full mt-4 rounded-md grid grid-cols-3">
                <div className="flex flex-col items-start">
                  <p className="text-xs text-black/70">Payment Amount</p>
                  <p className="text-base text-black">
                    {orderDetails.payment?.payment_amount || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-xs text-black/70">Payment Method</p>
                  <p className="text-base text-black">
                    {orderDetails.payment?.payment_method || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-xs text-black/70">Payment Status</p>
                  <p className="text-base text-black">
                    {orderDetails.payment?.payment_status || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className=" bg-gray-100  py-2 px-4 rounded-md flex mt-4 flex-col items-start w-full">
              <p className=" text-base text-black font-semibold">
                Shipping Details
              </p>
              <div className=" w-full mt-4 flex flex-col items-start">
                <p className="text-xs text-black/70">Shipping Status</p>
                <p className="text-sm text-black">
                  {orderDetails.shipping?.shipping_status || "N/A"}
                </p>
              </div>
              <div className=" w-full mt-4 flex flex-col items-start">
                <p className="text-xs text-black/70">AWB Number</p>
                <p className="text-sm text-black">
                  {orderDetails.shipping?.awb_number || "N/A"}
                </p>
              </div>
            </div>

            <div className=" bg-gray-100  py-2 px-4 rounded-md flex mt-4 flex-col items-start w-full">
              <p className=" text-base text-black font-semibold">
                Invoice Details
              </p>
              <div className=" w-full mt-4 grid grid-cols-2">
                <div className=" w-full  flex flex-col items-start">
                  <p className=" text-xs text-black/70">Created At</p>
                  <p className=" text-base text-black">
                    {dayjs(orderDetails.invoice?.created_at).format(
                      "hh:MM A , DD/MM/YYYY "
                    )}
                  </p>
                </div>
                <div className=" w-full mt-4 flex flex-col items-start">
                  <p className="text-xs text-black/70">Invoice Status</p>
                  <p className="text-sm text-black">
                    {orderDetails.invoice?.invoice_status || "N/A"}
                  </p>
                </div>
                <div className=" w-full mt-4 flex flex-col items-start">
                  <p className="text-xs text-black/70">Invoice Document</p>
                  {orderDetails.invoice?.invoice_url ? (
                    <button
                      onClick={() => {
                        window.open(
                          orderDetails.invoice?.invoice_url,
                          "_blank"
                        );
                      }}
                      className="text-sm flex flex-row justify-start items-center mt-1 bg-gray-200 rounded-md px-2 py-1 hover:bg-gray-300  text-black gap-x-2"
                    >
                      <FaFileAlt className="text-xl" />
                      <p>Download Invoice</p>
                    </button>
                  ) : (
                    <p className=" text-sm text-black/80">Not Available</p>
                  )}
                </div>
              </div>
            </div>

            <div className=" bg-gray-100  py-2 px-4 rounded-md flex mt-4 flex-col items-start w-1/2">
              <p className=" text-base text-black font-semibold">
                Order Summary
              </p>

              <div className=" w-full mt-4 flex flex-col items-start">
                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Shipping Charges</p>
                  <p className="text-sm text-black">
                    {orderDetails?.shipping_charges || "N/A"}
                  </p>
                </div>
                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Shipping Discount</p>
                  <p className="text-sm text-black">
                    {orderDetails?.shipping_discount || "N/A"}
                  </p>
                </div>
                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Order Discount</p>
                  <p className="text-sm text-black">
                    {orderDetails.order_discount || "N/A"}
                  </p>
                </div>
                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Order Final Amount</p>
                  <p className="text-sm text-black">
                    {orderDetails.order_final_amount || "N/A"}
                  </p>
                </div>

                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Order Sub Total</p>
                  <p className="text-sm text-black">
                    {orderDetails.order_sub_total || "N/A"}
                  </p>
                </div>
                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Order Total Amount</p>
                  <p className="text-sm text-black">
                    {orderDetails.order_total_amount || "N/A"}
                  </p>
                </div>
                <div className="w-full mt-4 flex flex-row items-center justify-between">
                  <p className="text-xs text-black/70">Order Status</p>
                  <p className="text-sm text-black">
                    {orderDetails.order_status || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrderDetailsModal;
