"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineViewList } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { PiFlagBanner } from "react-icons/pi";

const options = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: () => <MdOutlineSpaceDashboard className=" text-black text-xl" />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: () => <MdOutlineGroups3 className=" text-black text-xl" />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: () => <MdOutlineViewList className=" text-black text-xl" />,
  },
  {
    title: "Abandoned Carts",
    path: "/dashboard/carts",
    icon: () => <MdAddShoppingCart className=" text-black text-xl" />,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: () => <MdCheckCircleOutline className=" text-black text-xl" />,
  },
  {
    title: "Banner",
    path: "/dashboard/banner",
    icon: () => <PiFlagBanner className=" text-black text-xl" />,
  },
  {
    title: "Feedback",
    path: "/dashboard/feedback",
    icon: () => <MdOutlineMessage className=" text-black text-xl" />,
  },
];

const Sidebar = () => {
  return (
    <div className=" flex flex-col items-start p-4 w-full h-full ">
      {options.map((option) => (
        <a
          key={option.title}
          href={option.path}
          className="flex flex-row items-center gap-x-4 p-2 w-full cursor-pointer"
        >
          <option.icon />
          <p className=" text-black text-base mt-1">{option.title}</p>
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
