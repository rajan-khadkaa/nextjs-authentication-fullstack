"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sucessful signup. Response data: ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp error: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    // alert(`Hello ${user.username}!`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-4xl ">Signup Page.</h1>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 mt-8 w-[30vw]"
      >
        <input
          className="px-3 py-3 bg-gray-700 rounded-sm"
          onChange={(event) =>
            setUser((prev) => ({ ...prev, username: event.target.value }))
          }
          type="text"
          name="username"
          value={user.username}
          placeholder="Username"
        />
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
          {buttonDisabled ? "No signup" : "Sign Up"}
        </button>
        {/* <button type="submit" className="p-4 text-center w-full bg-gray-800 hover:bg-gray-600"></button> */}
        <span>
          Already a user?{" "}
          <Link href="/login">
            <u>Login here</u>
          </Link>
        </span>
      </form>
    </div>
  );
}
