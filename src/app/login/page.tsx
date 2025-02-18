"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        alert("successful login");
        toast.success("Login successful");
        console.log("User info: ", response.data.user);
        router.push(`/profile/${response.data.user}`);
      }
    } catch (error: any) {
      alert(error.response.data.error);
      console.log("error message: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-4xl ">Login Page.</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 mt-8 w-[30vw]"
      >
        <input
          className="px-3 py-3 bg-gray-700 rounded-sm"
          onChange={(event) =>
            setUser((prev) => ({ ...prev, email: event.target.value }))
          }
          type="email"
          name="username"
          value={user.email}
          placeholder="Email"
        />
        <input
          className="px-3 py-3 bg-gray-700 rounded-sm"
          onChange={(event) =>
            setUser((prev) => ({ ...prev, password: event.target.value }))
          }
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
        />
        <button
          type="submit"
          className="p-4 text-center w-full bg-gray-800 hover:bg-gray-600"
        >
          Login
        </button>
        {/* <button type="submit" className="p-4 text-center w-full bg-gray-800 hover:bg-gray-600"></button> */}
        <span>
          New user?{" "}
          <Link href="/signup">
            <u>Signup here</u>
          </Link>
        </span>
      </form>
    </div>
  );
}
