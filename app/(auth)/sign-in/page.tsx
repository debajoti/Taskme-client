"use client"
import SignInForm from "@/components/forms/SignInForm";
import React from "react";
const page = () => {
  return (
    <div className="w-2/3 lg:w-1/3 items-center border-black border-2 p-10 rounded-xl">
        <SignInForm />
    </div>
  );
};

export default page;
