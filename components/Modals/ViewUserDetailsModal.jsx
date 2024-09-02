"use client";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import instance from "@/utils/instance";
import { PiCoinsFill } from "react-icons/pi";
import Spinner from "../Spinner";

const labelClass = "text-black text-sm ";
const inputClass =
  "border border-black rounded-md p-1 text-black focus:outline-none";

const sections = [
  {
    title: "Address Details",
    value: "address",
  },
  {
    title: "Wallet Details",
    value: "wallet",
  },
];

const ViewUserDetailsModal = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { showUserDetailsModal, setShowUserDetailsModal } = useStore();
  const [userDetails, setUserDetails] = useState({});
  const [addressList, setAddressList] = useState([]);
  const [walletData, setWalletData] = useState({});
  const [activeTab, setActiveTab] = useState("address");

  const getWalletDetails = (id) => {
    setLoading(true);
    instance
      .get(`/admin/wallets/${id}/`)
      .then((res) => {
        setWalletData(res.data);
        console.log("wallet data");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push("/");
        }
        console.log("err", err);
        setLoading(false);
      });
  };

  const getAddressDetails = (id) => {
    setLoading(true);
    instance
      .get("/admin/addresses/" + id + "/")
      .then((res) => {
        setAddressList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push("/");
        }
        console.log(err);
        setLoading(false);
      });
  };

  const getUserDetails = (id) => {
    setLoading(true);
    instance
      .get(`/admin/users/${id}/`)
      .then((res) => {
        setUserDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setIsOpen(showUserDetailsModal.show);
    if (showUserDetailsModal.show) {
      getUserDetails(showUserDetailsModal.id);
      getWalletDetails(showUserDetailsModal.id);
      getAddressDetails(showUserDetailsModal.id);
    }
  }, [showUserDetailsModal.show]);

  const handleModalClose = () => {
    setShowUserDetailsModal({ show: false, id: "" });
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-50 inset-0 flex items-center justify-center bg-black/30`}
    >
      <div className="bg-white w-8/12 max-h-[80vh] overflow-y-scroll py-6 px-8 rounded-md flex flex-col ">
        {loading ? (
          <div className=" h-[50vh] relative flex flex-col items-center justify-center w-full">
            <Spinner loading={loading} />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <h3 className="text-black text-2xl font-bold">User Details</h3>
              <IoMdClose
                onClick={() => handleModalClose()}
                className="text-black text-2xl cursor-pointer"
              />
            </div>
            <div className="flex flex-col w-full mt-4">
              <div className=" grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col ">
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    value={userDetails.name}
                    className={inputClass}
                    disabled
                  />
                </div>
                <div className="flex flex-col ">
                  <label className={labelClass}>Email</label>
                  <input
                    type="text"
                    value={userDetails.email}
                    className={inputClass}
                    disabled
                  />
                </div>
                <div className="flex flex-col ">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="text"
                    value={userDetails.phone_number}
                    className={inputClass}
                    disabled
                  />
                </div>
                <div className="flex flex-col ">
                  <label className={labelClass}>Date Joined</label>
                  <input
                    type={"text"}
                    value={new Date(userDetails.date_joined).toUTCString()}
                    className={inputClass}
                    disabled
                  />
                </div>
                <div className="flex flex-col ">
                  <label className={labelClass}>Role</label>
                  <input
                    type="text"
                    value={
                      userDetails.is_superuser
                        ? "Admin"
                        : userDetails.is_staff
                        ? "Staff"
                        : "User"
                    }
                    className={inputClass}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className=" flex flex-row justify-between items-center w-full mt-[5vh]">
              <div className=" flex flex-col items-start w-6/12">
                <div className=" flex flex-row justify-start items-center">
                  <PiCoinsFill className=" text-2xl text-black" />
                  <h2 className=" text-black text-base lg:text-xl ml-2">
                    HydroShark Coins
                  </h2>
                </div>
                <p className=" text-black text-xs">
                  {
                    "(You can redeem HydrodShark coins by pucharsing HydroShark Gymwear)"
                  }
                </p>
              </div>

              <div className=" flex flex-col items-end w-1/2">
                <div className=" flex flex-row w-3/12 justify-end items-center">
                  <PiCoinsFill className=" text-2xl text-black" />
                  <p className=" text-black text-lg mt-1">
                    {walletData?.wallet_balance}
                  </p>
                </div>

                <p className=" text-sm text-black">Available Coins</p>
              </div>
            </div>
            <div className=" flex flex-col items-start w-full mt-[5vh]">
              <h2 className=" text-xl font-semibold text-black mb-4">
                Address
              </h2>
              <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                {addressList.map((address, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row w-full justify-between bg-gray-100 p-4 rounded-lg "
                    >
                      <div className=" w-10/12 lg:w-9/12 flex flex-row text-sm flex-wrap items-start">
                        <p className="  text-black">
                          {address.address_line_1},
                        </p>
                        <p className=" text-black">{address.address_line_2},</p>
                        <p className="  text-black">{` ${address.city}, ${address.state},`}</p>
                        <p className="  text-black">{` ${address.country}, ${address.zipcode}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserDetailsModal;
