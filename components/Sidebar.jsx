"use client";
import React, { useState, useEffect } from "react";
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
    icon: (addedClass) => <MdOutlineSpaceDashboard className={addedClass} />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: (addedClass) => <MdOutlineGroups3 className={addedClass} />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: (addedClass) => <MdOutlineViewList className={addedClass} />,
  },
  {
    title: "Abandoned Carts",
    path: "/dashboard/carts",
    icon: (addedClass) => <MdAddShoppingCart className={addedClass} />,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: (addedClass) => <MdCheckCircleOutline className={addedClass} />,
  },
  {
    title: "Banner",
    path: "/dashboard/banner",
    icon: (addedClass) => <PiFlagBanner className={addedClass} />,
  },
  {
    title: "Feedback",
    path: "/dashboard/feedback",
    icon: (addedClass) => <MdOutlineMessage className={addedClass} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className=" flex flex-col items-start p-4 w-full h-full ">
      {options.map((option) => (
        <a
          key={option.title}
          href={option.path}
          className={`flex flex-row items-center ${
            active == option.path ? "bg-black" : "bg-white"
          } gap-x-4 rounded-md py-2 px-4 w-full cursor-pointer`}
        >
          <option.icon
            addedClass={
              active == option.path
                ? "text-white text-xl"
                : "text-black text-xl"
            }
          />
          <p
            className={` ${
              active != option.path ? "text-black" : "text-white"
            } text-black text-base mt-1`}
          >
            {option.title}
          </p>
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
