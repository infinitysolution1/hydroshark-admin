"use client";
import React, { useState, useEffect } from "react";
import UserDataTable from "./_usersTable";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center h-full p-4">
      <div className=" flex flex-col items-start w-full">
        <p className=" text-2xl font-semibold text-black">Users</p>
      </div>
      <div className="w-full flex flex-col max-h-[70vh] mt-4 ">
        <UserDataTable />
      </div>
    </div>
  );
};

export default page;
