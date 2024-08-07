import React from "react";
import AdminNavbar from "@/components/AdminNavbar";
import Sidebar from "@/components/Sidebar";
import CreateProductModal from "@/components/Modals/CreateProductModal";

export const metadata = {
  title: "Dashboard | Hydroshark",
  description: "India's First Carbonated Hydration Drink",
};

const Layout = ({ children }) => {
  return (
    <main className="w-screen h-screen flex flex-col items-start bg-white ">
      <AdminNavbar />
      <div className=" flex flex-row justify-between h-[90vh] overlfow-y-scroll">
        <div className=" flex w-[20vw] flex-col h-full border-r-[0.5px] border-[#c7c7c7]">
          <Sidebar />
        </div>
        <div className=" flex flex-col w-[80vw]">{children}</div>
      </div>
      <CreateProductModal />
    </main>
  );
};

export default Layout;
