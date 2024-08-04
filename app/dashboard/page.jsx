"use client";
import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import BarChartDashboard from "@/components/Charts/SampleCharts";

let charts = [
  {
    title: "Total Sales",
  },
  {
    title: "Online Store Sessions",
  },
  {
    title: "Online Store Conversion Rate",
  },
  {
    title: "Average Order Value",
  },
  {
    title: "Total Orders",
  },
  {
    title: "Top Selling Products",
  },
];

const page = () => {
  return (
    <div className="w-full flex flex-col items-center h-[90vh] p-4 bg-[#f6f6f6] overflow-y-scroll">
      <div className=" flex flex-col items-start w-full">
        <p className=" text-2xl font-semibold text-black">Dashboard</p>
      </div>
      <div className=" flex flex-row w-full justify-between">
        <div className=" w-3/12 flex flex-row justify-start gap-x-4 mt-4">
          <button className="px-4 py-1 w-5/12 flex flex-row justify-center items-center border-[1px] bg-white group hover:bg-black  border-black rounded-lg gap-x-2">
            <FaRegCalendarAlt className=" text-base text-black group-hover:text-white" />
            <span className=" text-sm text-black  group-hover:text-white">
              Today
            </span>
          </button>
          <button className="px-4 py-1 w-5/12 flex flex-row justify-center items-center border-[1px] bg-white group hover:bg-black  border-black rounded-lg gap-x-2">
            {/* <FaRegCalendarAlt className=" text-base text-black group-hover:text-white" /> */}
            <span className=" text-sm text-black  group-hover:text-white">
              Previous
            </span>
          </button>
        </div>
      </div>

      <div className=" w-full grid grid-cols-3 gap-4 mt-8">
        {charts.map((chart, index) => (
          <div className=" w-full h-[40vh] bg-white rounded-lg shadow-md px-2 py-2 flex flex-col justify-between">
            <p className=" text-base text-black">{chart.title}</p>
            <div className=" w-full flex flex-col items-start justify-start h-[35vh] p-2 rounded-lg">
              {chart.title === "Online Store Conversion Rate" ? (
                <div className=" w-full flex flex-col items-start">
                  <p className="mt-2 text-2xl text-black">24%</p>

                  <div className=" flex flex-row w-full justify-between items-center mt-4 border-b-[1px] border-[#c7c7c7] pb-2 px-2">
                    <div className=" flex flex-col items-start">
                      <p className=" text-sm text-black">Add to Cart</p>
                      <p className=" text-xs text-black/60">280 sessions</p>
                    </div>
                    <p className=" text-base text-black">58%</p>
                  </div>
                  <div className=" flex flex-row w-full justify-between items-center mt-4 border-b-[1px] border-[#c7c7c7] pb-2 px-2">
                    <div className=" flex flex-col items-start">
                      <p className=" text-sm text-black">Reached Checkout</p>
                      <p className=" text-xs text-black/60">180 sessions</p>
                    </div>
                    <p className=" text-base text-black">37%</p>
                  </div>
                  <div className=" flex flex-row w-full justify-between items-center mt-4 border-b-[1px] border-[#c7c7c7] pb-2 px-2">
                    <div className=" flex flex-col items-start">
                      <p className=" text-sm text-black">Converted Sessions</p>
                      <p className=" text-xs text-black/60">80 sessions</p>
                    </div>
                    <p className=" text-base text-black">24%</p>
                  </div>
                </div>
              ) : (
                <BarChartDashboard />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
