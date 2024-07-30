"use client";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import instance from "@/utils/instance";
import { useRouter } from "next/navigation";
import Image from "next/image";

const textClass = "text-[#333]";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    router.push("/dashboard");
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen w-screen bg-white/80">
      <div className=" h-screen w-screen absolute z-0">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + "/img9.webp"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" z-20 flex flex-col items-center justify-center w-6/12 h-[60vh] bg-white border-[0.5px] border-[#c7c7c7]/70 rounded-2xl shadow-xl">
        <div className=" flex flex-row justify-center items-center">
          <div className=" h-[7.5vh] w-[7.5vh] relative">
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + "/hydroshark.png"}
              layout="fill"
              alt="hydroshark"
            />
          </div>
          <p className=" text-4xl text-black ml-4 mt-2 font-medium">
            HYDROSHARK ADMIN
          </p>
        </div>
        <h2 className="text-2xl font-bold text-[#333] mt-4">Login</h2>
        <form
          className="flex flex-col items-center w-8/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full">
            <label htmlFor="email" className={textClass}>
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="w-full p-2 my-1 text-black border-[0.5px] border-[#c7c7c7] rounded-md"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email ? (
              <span className="text-red-500 text-xs">
                {errors?.email?.message?.toString() || ""}
              </span>
            ) : (
              <span className=" text-sm"> </span>
            )}
          </div>
          <div className="flex flex-col w-full mt-4">
            <label htmlFor="password" className={textClass}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-2 my-1 text-black border-[0.5px] border-[#c7c7c7] rounded-md"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password ? (
              <span className="text-red-500 text-xs">
                {errors?.password?.message?.toString() || ""}
              </span>
            ) : (
              <span className=" text-sm"> </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-[#333] text-white rounded-md"
          >
            Login
          </button>
          <a className="underline mt-2 cursor-pointer text-black">
            {"Forgot Password "}
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
