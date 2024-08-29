"use client";
import React, { useState, useEffect } from "react";
import UserDataTable from "./_usersTable";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import instance from "@/utils/instance";
import Spinner from "@/components/Spinner";

const Users = () => {
  const [loading, setLoading] = useState(false);

  const ExportUserData = () => {
    setLoading(true);
    instance
      .get("/admin/export_users/")
      .then((res) => {
        setLoading(false);
        console.log("res", res);
        if (res.data.length > 0) {
          downloadCSV(res.data, "users.csv");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const downloadCSV = (csvContent, filename = "data.csv") => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col items-center h-full p-4">
      <div className="w-full flex flex-row justify-between items-center ">
        <p className=" text-2xl font-semibold text-black">Users</p>

        {loading ? (
          <div className=" flex flex-row bg-black rounded-lg justify-center items-center px-4 gap-x-2 py-2">
            <Spinner loading={loading} size={20} color={"#ffffff"} />
          </div>
        ) : (
          <button
            onClick={() => {
              ExportUserData();
            }}
            className=" flex flex-row bg-black rounded-lg justify-center items-center px-4 gap-x-2 py-2"
          >
            <IoDocumentTextOutline className=" text-base text-white" />
            <p className=" text-sm text-white">Export</p>
          </button>
        )}
      </div>
      <div className="w-full flex flex-col max-h-[70vh] mt-4 ">
        <UserDataTable />
      </div>
    </div>
  );
};

export default Users;
