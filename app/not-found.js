"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#f0f2f4] flex flex-col justify-center z-30 items-center">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:72px_72px]"></div>

      <h2 className=" text-3xl lg:text-[4rem] text-[#181818] mb-[32.5vh] lg:mb-[20vh] ">
        {"404 - Page Not Found"}
      </h2>
      <p className=" absolute top-[30vh] text-[5rem] md:text-[9rem] lg:text-[14rem] text-black/5 leading-[5rem] lg:leading-[13rem] ">
        HYDROSHARK ADMIN
      </p>

      <button
        onClick={() => {
          router.push("/login");
        }}
        className=" absolute top-[50vh] bg-[#181818] text-white text-base px-4 py-2 rounded-lg"
      >
        {"Go Back Home"}
      </button>
    </div>
  );
};

export default NotFound;
