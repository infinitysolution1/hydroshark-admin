"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return <main>{children}</main>;
};

export default Layout;
