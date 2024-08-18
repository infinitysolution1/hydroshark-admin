"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const existingOptions = [
  {
    title: "10% off on all orders above 1000",
    end_date: "2022-12-31",
  },
  {
    title: "Free shipping on all orders above 500",
    end_date: "2022-12-31",
  },
];

const Banner = () => {
  return (
    <div className=" flex flex-col items-start p-4 w-full h-full ">
      <div className=" flex flex-row justify-between w-full items-center">
        <p className=" text-2xl font-semibold text-black">Banner</p>
      </div>

      <div className="p-4 rounded-lg w-full bg-gray-100 mt-2">
        <form className="flex flex-col gap-y-4">
          <div className="flex flex-col d">
            <label className="text-black">Title</label>
            <input
              type="text"
              className="p-2 rounded-md border text-black border-gray-300"
            />
          </div>
          <div className=" w-full flex flex-row items-end justify-between">
            <div className=" flex flex-col w-[20vw] items-start">
              <label className="text-black">End Date</label>
              <input
                type="date"
                className="p-2 rounded-md border w-full text-black border-gray-300"
              />
            </div>

            <div className=" flex flex-row justify-end items-center gap-x-4">
              <button className=" border border-red-400 text-red-400 px-4 py-2 rounded-md">
                Cancel
              </button>
              <button className="bg-black border border-black text-white px-4 py-2 rounded-md">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full flex flex-col max-h-[70vh] mt-8 ">
        <p className=" text-2xl font-semibold text-black">Active Banners</p>

        <div className=" rounded-lg w-full bg-gray-100 mt-2">
          <div className="flex flex-col gap-y-4">
            {existingOptions.map((option) => (
              <div className="flex flex-row justify-between items-center border-[1px] border-black text-black p-2 rounded-md">
                <div className=" flex flex-col items-start">
                  <p className=" text-sm text-black/60">Title</p>
                  <p>{option.title}</p>
                </div>
                <div className=" flex flex-row justify-end items-center gap-x-2">
                  <div className=" flex flex-col items-start">
                    <p className=" text-sm text-black/60">End Date</p>
                    <p className=" text-base mr-4"> {option.end_date}</p>
                  </div>

                  <button className="text-black py-2 rounded-md">
                    <MdEdit className=" text-xl" />
                  </button>
                  <button className="text-red-400 py-2  rounded-md">
                    <MdDelete className=" text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col max-h-[70vh] mt-8 ">
          <p className=" text-2xl font-semibold text-black">Past Banners</p>

          <div className=" rounded-lg w-full bg-gray-100 mt-2">
            <div className="flex flex-col gap-y-4">
              {existingOptions.map((option) => (
                <div className="flex flex-row justify-between opacity-6s0 items-center border-[1px] border-black text-black p-2 rounded-md">
                  <div className=" flex flex-col items-start">
                    <p className=" text-sm text-black/60">Title</p>
                    <p>{option.title}</p>
                  </div>
                  <div className=" flex flex-row justify-end items-center gap-x-2">
                    <div className=" flex flex-col items-start">
                      <p className=" text-sm text-black/60">End Date</p>
                      <p className=" text-base mr-4"> {option.end_date}</p>
                    </div>

                    <button className="text-black py-2 rounded-md">
                      <MdEdit className=" text-xl" />
                    </button>
                    <button className="text-red-400 py-2  rounded-md">
                      <MdDelete className=" text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
