"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FiTrash2 } from "react-icons/fi";
import { IoPencilSharp } from "react-icons/io5";
import instance from "@/utils/instance";
import Spinner from "@/components/Spinner";

const data = [
  {
    userName: "Dummy user",
    phoneNumber: "1234567890",
    email: "dummy@user.com",
    bankName: "Dummy Bank",
    branch: "Dummy Branch",
    accountNumber: "123456789",
    ifscCode: "DUMMY12345",
  },
  {
    userName: "user 2",
    phoneNumber: "9876543210",
    email: "user2@user.com",
    bankName: "Bank 2",
    branch: "Branch 2",
    accountNumber: "987654321",
    ifscCode: "BANK98765",
  },
  {
    userName: "user 3",
    phoneNumber: "5555555555",
    email: "user3@user.com",
    bankName: "Bank 3",
    branch: "Branch 3",
    accountNumber: "555555555",
    ifscCode: "BANK55555",
  },
  {
    userName: "user 4",
    phoneNumber: "1111111111",
    email: "user4@user.com",
    bankName: "Bank 4",
    branch: "Branch 4",
    accountNumber: "111111111",
    ifscCode: "BANK11111",
  },
  {
    userName: "user 5",
    phoneNumber: "9999999999",
    email: "user5@user.com",
    bankName: "Bank 5",
    branch: "Branch 5",
    accountNumber: "999999999",
    ifscCode: "BANK99999",
  },
  {
    userName: "user 6",
    phoneNumber: "7777777777",
    email: "user6@user.com",
    bankName: "Bank 6",
    branch: "Branch 6",
    accountNumber: "777777777",
    ifscCode: "BANK77777",
  },
  {
    userName: "user 7",
    phoneNumber: "4444444444",
    email: "user7@user.com",
    bankName: "Bank 7",
    branch: "Branch 7",
    accountNumber: "444444444",
    ifscCode: "BANK44444",
  },
  {
    userName: "user 8",
    phoneNumber: "2222222222",
    email: "user8@user.com",
    bankName: "Bank 8",
    branch: "Branch 8",
    accountNumber: "222222222",
    ifscCode: "BANK22222",
  },
  {
    userName: "user 9",
    phoneNumber: "8888888888",
    email: "user9@user.com",
    bankName: "Bank 9",
    branch: "Branch 9",
    accountNumber: "888888888",
    ifscCode: "BANK88888",
  },
  {
    userName: "user 10",
    phoneNumber: "6666666666",
    email: "user10@user.com",
    bankName: "Bank 10",
    branch: "Branch 10",
    accountNumber: "666666666",
    ifscCode: "BANK66666",
  },
];

const UserDataTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getUserList = () => {
    setLoading(true);
    instance
      .get("/accounts/user/")
      .then((res) => {
        console.log("res", res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   getUserList();
  // }, []);

  const columns = [
    {
      headerName: "User Name",
      field: "userName",
    },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
    },
    {
      headerName: "Bank Name",
      field: "bankName",
      width: 200,
    },
    {
      headerName: "Branch",
      field: "branch",
    },
    {
      headerName: "Account Number",
      field: "accountNumber",
    },
    {
      headerName: "Actions",
      field: "action",
      width: 80,
      cellRenderer: (params) => {
        return (
          <div className="flex flex-row group justify-center items-center h-full gap-x-2">
            <button className="text-red-400 group-hover:text-red-400/80">
              <FiTrash2 size={20} />
            </button>
            <button className="text-black/60 group-hover:text-black/80">
              <IoPencilSharp size={20} />
            </button>
          </div>
        );
      },
    },
  ];

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
      className="ag-theme-quartz flex flex-col  h-[70vh] overflow-y-scroll" // applying the grid theme
    >
      <AgGridReact rowData={data} columnDefs={columns} />
    </div>
  );
};

export default UserDataTable;
