"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import instance from "@/utils/instance";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Spinner from "@/components/Spinner";
import { GoInbox } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import * as dayjs from "dayjs";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
dayjs().format();

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getReviews = () => {
    setLoading(true);
    instance
      .get(`/admin/reviews/?page=${page}`)
      .then((res) => {
        console.log("res", res.data);
        setLoading(false);
        setFeedbacks(res.data.results);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    instance
      .patch(`/billing/reviews/${id}/`, {
        is_deleted: true,
      })
      .then((res) => {
        getReviews();
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

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
        <p className=" text-2xl font-semibold text-black">Feedback</p>
      </div>
      <div className="w-full flex flex-col h-[75vh] overflow-y-scroll mt-4">
        {feedbacks.length > 0 ? (
          <div className="w-full grid grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => {
              return (
                <div className=" flex flex-col w-full p-4 rounded-md border-[1px] border-[#c7c7c7]">
                  <div className=" flex flex-row justify-between w-full">
                    <div className=" flex flex-row justify-start gap-x-4 items-center">
                      {Array(feedback.rating + 1)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} className=" text-yellow-500" />
                        ))}
                      {Array(5 - feedback.rating - 1)
                        .fill()
                        .map((_, i) => (
                          <FaRegStar key={i} className=" text-yellow-500" />
                        ))}
                    </div>

                    <ConfirmDeleteModal
                      id={feedback.id}
                      title={" Feedback"}
                      onConfirm={() => {
                        handleDelete(feedback.id);
                      }}
                    />
                  </div>
                  <div className=" flex flex-col items-start mt-4">
                    <p className=" text-xs text-black/70">Review</p>
                    <p className=" text-base text-black">{feedback.review}</p>
                  </div>
                  <div className=" flex flex-row w-full justify-between mt-4">
                    <p className=" text-xs text-black">{`Order# ${feedback.order}`}</p>
                    <p className=" text-xs text-black/70">
                      {dayjs(feedback.created_at).format(
                        "hh:mm A , DD/MM/YYYY"
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center w-full h-[40vh] ">
            <GoInbox className=" text-4xl text-black" />
            <p className=" text-base text-black">No Feedback Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
