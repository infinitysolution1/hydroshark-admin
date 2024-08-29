"use client";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoPencilSharp } from "react-icons/io5";
import instance from "@/utils/instance";
import Spinner from "@/components/Spinner";
import { GoInbox } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import useStore from "@/utils/store";

// const user = [
//   {
//     id: 5,
//     is_superuser: true,
//     first_name: "",
//     last_name: "",
//     is_staff: false,
//     is_active: true,
//     date_joined: "2024-08-19T13:30:34.654683Z",
//     created_at: "2024-08-19T13:30:34.655301Z",
//     modified_at: "2024-08-26T12:22:43.561939Z",
//     is_deleted: false,
//     password: null,
//     username: "9398542806",
//     name: "Anirudh Joshi",
//     phone_number: "9398542806",
//     email: "anirudhjoshi285@gmail.com",
//     last_login: "2024-08-26",
//     groups: [],
//     user_permissions: [],
//   },
// ];

const UserDataTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { showUserDetailsModal, setShowUserDetailsModal } = useStore();

  const getUserList = () => {
    setLoading(true);
    instance
      .get("/admin/users/")
      .then((res) => {
        console.log("res", res);
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleUserDelete = (id) => {
    setLoading(true);
    instance
      .patch(`/admin/users/${id}/`, {
        is_deleted: true,
      })
      .then((res) => {
        setLoading(false);
        console.log("res", res);
        getUserList();
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-[60vh] w-full justify-center items-center">
        <Spinner loading={loading} />
        <p className="text-base mt-2 text-black">Loading User Data</p>
      </div>
    );
  }

  return (
    <div
      className=" flex flex-col w-full h-[70vh]" // applying the grid theme
    >
      {data.length > 0 ? (
        <div className=" flex flex-col items-start w-full h-full overflow-y-scroll ">
          {data.map((user, index) => {
            return (
              <div className=" w-full px-2 py-2 border-[0.5px] border-[#c7c7c7] rounded-md flex flex-row justify-between  mb-2">
                <div className=" flex flex-row justify-start gap-x-4 w-[20%]">
                  <div className=" p-4 rounded-md bg-gray-300">
                    <FaRegUser className=" text-xl text-gray-700" />
                  </div>

                  <div className=" flex flex-col items-start justify-center">
                    <p className=" text-base text-black font-semibold">
                      {user.name}{" "}
                      {user.is_superuser ? (
                        <span
                          className={" bg-gray-200 px-2 rounded-xl text-[10px]"}
                        >
                          Admin
                        </span>
                      ) : null}
                    </p>
                    <p className=" text-sm text-black">{user.email}</p>
                  </div>
                </div>

                <div className=" flex flex-col items-start justify-center w-[10%]">
                  <p className=" text-xs text-black/40">Phone Number</p>
                  <p className=" text-sm text-black">{user.phone_number}</p>
                </div>
                <div className=" flex flex-col items-start justify-center w-[10%]">
                  <p className=" text-xs text-black/40">Phone Number</p>
                  <p className=" text-sm text-black">{user.email}</p>
                </div>

                <div className=" flex flex-row gap-x-2 w-[10%] items-center justify-center">
                  <button
                    onClick={() => {
                      setShowUserDetailsModal({
                        show: true,
                        id: user.id,
                      });
                    }}
                  >
                    <LuEye className=" text-xl text-black" />
                  </button>

                  <ConfirmDeleteModal
                    type="icon"
                    onConfirm={() => {
                      handleUserDelete(user.id);
                    }}
                    title={user.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center w-full h-[40vh] ">
          <GoInbox className=" text-4xl text-black" />
          <p className=" text-base text-black">No User Data Found</p>
        </div>
      )}
    </div>
  );
};

export default UserDataTable;
