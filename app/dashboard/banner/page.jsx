"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import instance from "@/utils/instance";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import * as dayjs from "dayjs";
dayjs().format();

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
  const [loading, setLoading] = React.useState(false);
  const [activeBanners, setActiveBanners] = React.useState([]);
  const [pastBanners, setPastBanners] = React.useState([]);
  const [mode, setMode] = React.useState("create");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      end_date: "",
    },
  });

  const getBanners = () => {
    setLoading(true);
    instance
      .get("/admin/banners/")
      .then((res) => {
        const active = res.data.results.filter((item) => {
          return new Date(item.end_date) > new Date();
        });
        const past = res.data.results.filter((item) => {
          return new Date(item.end_date) < new Date();
        });
        setActiveBanners(active);
        setPastBanners(past);
        console.log("res", res.data, active, past);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    if (mode == "create") {
      createBanner(data);
    } else {
      updateBanner(data);
    }
  };

  const updateBanner = (data) => {
    setLoading(true);
    instance
      .patch(`/admin/banners/${activeBanners[0].id}/`, {
        title: data.title,
        end_date: new Date(data.end_date),
      })
      .then((res) => {
        reset();
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const createBanner = (data) => {
    setLoading(true);
    instance
      .post("/admin/banners/", {
        title: data.title,
        end_date: new Date(data.end_date),
      })
      .then((res) => {
        reset();
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className=" flex flex-col items-start p-4 w-full h-[90vh] overflow-y-scroll">
      <div className=" flex flex-row justify-between w-full items-center">
        <p className=" text-2xl font-semibold text-black">Banner</p>
      </div>

      <div className="p-4 rounded-lg w-full bg-gray-100 mt-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col d">
            <label className="text-black">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="p-2 rounded-md border text-black border-gray-300"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">Title is required</p>
            )}
          </div>
          <div className=" w-full flex flex-row items-end justify-between">
            <div className=" flex flex-col w-[20vw] items-start">
              <label className="text-black">End Date</label>
              <input
                type="date"
                {...register("end_date", { required: true })}
                className="p-2 rounded-md border w-full text-black border-gray-300"
              />
              {errors.end_date && (
                <p className="text-red-500 text-xs">End Date is required</p>
              )}
            </div>

            <div className=" flex flex-row justify-end items-center gap-x-4">
              <button
                onClick={() => {
                  setTitle("");
                  setEndDate("");
                }}
                className=" border border-red-400 text-red-400 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type={"submit"}
                className="bg-black border border-black text-white px-4 py-2 rounded-md"
              >
                {mode == "create" ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full flex flex-col max-h-[70vh] mt-8 ">
        <p className=" text-2xl font-semibold text-black">Active Banners</p>

        {loading ? (
          <div className="flex flex-col h-[20vh] w-full justify-center items-center">
            <Spinner loading={loading} />
            <p className="text-base mt-2 text-black">Loading Banner Data</p>
          </div>
        ) : activeBanners.length > 0 ? (
          <div className=" rounded-lg w-full bg-gray-100 max-h-[40vh] overflow-y-scroll mt-2">
            <div className="flex flex-col gap-y-4">
              {activeBanners.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center border-[1px] overflow-hidden border-black text-black p-2 rounded-md"
                >
                  <div className=" flex flex-col items-start">
                    <p className=" text-sm text-black/60">Title</p>
                    <p>{option.title}</p>
                  </div>
                  <div className=" flex flex-row justify-end items-center gap-x-2">
                    <div className=" flex flex-col items-start">
                      <p className=" text-sm text-black/60">End Date</p>
                      <p className=" text-base mr-4">
                        {" "}
                        {dayjs(option.end_date).format("DD/MM/YY")}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setMode("edit");
                        setValue("title", option.title);
                        setValue("end_date", option.end_date);
                      }}
                      className="text-black py-2 rounded-md"
                    >
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
        ) : (
          <div className="flex flex-col h-[20vh] w-full justify-center items-center">
            <p className="text-base mt-2 text-black">No past banners</p>
          </div>
        )}

        <div className="w-full flex flex-col max-h-[70vh] mt-8 ">
          <p className=" text-2xl font-semibold text-black">Past Banners</p>

          <div className=" rounded-lg w-full bg-gray-100 mt-2">
            {loading ? (
              <div className="flex flex-col h-[20vh] w-full justify-center items-center">
                <Spinner loading={loading} />
                <p className="text-base mt-2 text-black">Loading Banner Data</p>
              </div>
            ) : pastBanners.length > 0 ? (
              <div className="flex flex-col gap-y-4 max-h-[30vh] overflow-y-scroll">
                {pastBanners.map((option, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between opacity-6s0 items-center border-[1px] border-black text-black p-2 rounded-md"
                  >
                    <div className=" flex flex-col items-start">
                      <p className=" text-sm text-black/60">Title</p>
                      <p>{option.title}</p>
                    </div>
                    <div className=" flex flex-row justify-end items-center gap-x-2">
                      <div className=" flex flex-col items-start">
                        <p className=" text-sm text-black/60">End Date</p>
                        <p className=" text-base mr-4">
                          {dayjs(option.end_date).format("DD/MM/YY")}
                        </p>
                      </div>

                      <button className="text-red-400 py-2  rounded-md">
                        <MdDelete className=" text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col h-[20vh] w-full justify-center items-center">
                <p className="text-base mt-2 text-black">No past banners</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
