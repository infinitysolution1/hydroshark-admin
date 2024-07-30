"use client";
import React from "react";
import Image from "next/image";

const AdminNavBar = () => {
  return (
    <div className=" flex flex-row justify-between h-[10vh] w-full items-center px-8 border-b-[0.5px] border-[#c7c7c7]">
      <div className=" flex flex-row justify-start items-center">
        <div className=" h-[7.5vh] w-[7.5vh] relative">
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + "/hydroshark.png"}
            layout="fill"
            alt="hydroshark"
          />
        </div>
        <p className=" text-2xl text-black ml-4 mt-2 font-bold">
          HYDROSHARK ADMIN
        </p>
      </div>
      <div className="flex flex-row justify-between items-center gap-x-4">
        <a className="text-lg  text-black">Logout</a>
      </div>
    </div>
  );
};

export default AdminNavBar;
