"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import instance from "@/utils/instance";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Spinner from "@/components/Spinner";
import { GoInbox } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import Pagination from "@/components/Pagination";
import * as dayjs from "dayjs";
dayjs().format();

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { setShowOrderDetailsModal, showOrderDetailsModal } = useStore();

  const getOrders = () => {
    setLoading(true);
    instance
      .get(`/admin/orders/?page=${page}`)
      .then((res) => {
        console.log("res", res.data);
        setTotalPages(Math.ceil(res.data.count / 10));
        setLoading(false);
        setOrders(res.data.results);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    getOrders();
  }, [page]);

  if (loading) {
    return (
      <div className="flex flex-col h-[60vh] w-full justify-center items-center">
        <Spinner loading={loading} />
        <p className="text-base mt-2 text-black">Loading Order Data</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center h-full p-4">
      <div className=" flex flex-row justify-between w-full items-center">
        <p className=" text-2xl font-semibold text-black">Orders</p>
      </div>
      <div className="w-full flex flex-col h-[75vh]  mt-4">
        {orders.length > 0 ? (
          <div className=" flex flex-col items-end w-full">
            <div className=" flex flex-col w-full h-[75vh] items-start mb-2 overflow-y-scroll">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className=" flex flex-row justify-between items-center w-full border-[1px] border-[#c7c7c7] px-4 py-2 rounded-md mb-2"
                >
                  <div className=" flex flex-col items-start">
                    <p className=" text-xs text-black/70">Order ID</p>
                    <p className=" text-base text-black">{`Order# ${order.id}`}</p>
                  </div>

                  <div className=" flex flex-col items-start">
                    <p className=" text-xs text-black/70">Order Date</p>
                    <p className=" text-xs text-black">
                      {dayjs(order.created_at).format("hh:MM a , DD-MM-YYYY ")}
                    </p>
                  </div>

                  <div className=" flex flex-col items-start">
                    <p className=" text-xs text-black/70">Payment Mode</p>
                    <p className=" text-xs text-black">
                      {order.payment.payment_method || "N/A"}
                    </p>
                  </div>

                  <div className=" flex flex-col items-start">
                    <p className=" text-xs text-black/70">Payment Status</p>
                    <p className=" text-xs text-black px-2 bg-gray-200 rounded-md">
                      {order.payment.payment_status || "N/A"}
                    </p>
                  </div>

                  <div className=" flex flex-col items-start">
                    <p className=" text-xs text-black/70">Order Amount</p>
                    <p className=" text-xs text-black">
                      {order.payment.payment_amount || "N/A"}
                    </p>
                  </div>

                  <div className=" flex flex-col items-start">
                    <button
                      onClick={() => {
                        setShowOrderDetailsModal({
                          show: true,
                          id: order.id,
                        });
                      }}
                      className="text-black py-2 rounded-md"
                    >
                      <LuEye className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 0 ? (
              <Pagination
                count={totalPages}
                page={page}
                onChange={(val) => setPage(val)}
              />
            ) : null}
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center w-full h-[40vh] ">
            <GoInbox className=" text-4xl text-black" />
            <p className=" text-base text-black">No Orders Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
