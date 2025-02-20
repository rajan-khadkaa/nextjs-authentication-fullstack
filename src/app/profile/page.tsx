"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const handleLogout = async () => {
    const askUser = confirm("Are you sure you want to logout?");
    if (askUser) {
      try {
        const response = await axios.get("/api/users/logout");
        router.push("/login");
      } catch (error: any) {
        console.log("Error: ", error.message);
      }
    }
  };
  return (
    <div className="w-full h-[100vh] relative">
      <div className="mx-40 mt-20 flex flex-col gap-8">
        <img
          className="size-[100px] rounded-full object-cover object-center border-2 border-white/40"
          src="https://images.unsplash.com/photo-1516651000622-7f32fe80a57a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile image"
        />
        <div className="flex justify-between gap-2 text-lg font-semibold text-gray-600">
          <p>Profile page.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-gray-800 rounded-3xl w-full h-[300px] absolute -top-[240] -z-10"></div>
    </div>
  );
}

export default page;
