"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    getUserProfile();
  }, [params.id]);

  const handleLogout = async () => {
    const askUser = confirm("Are you sure you want to logout?");
    if (askUser) {
      try {
        await axios.get("/api/users/logout");
        router.push("/login");
      } catch (error: any) {
        console.log("Error: ", error.message);
      }
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await axios.get(`/api/users/${params.id}`);
      setUser(res.data.user);
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="w-full h-[100vh] relative">
      <div className="mx-40 mt-20 flex flex-col gap-8">
        <Image
          className="size-[100px] rounded-full object-cover object-center border-2 border-white/40"
          src="https://images.unsplash.com/photo-1530452540414-c17a65a637fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxwcm9maWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
          alt="profile image"
        />
        <div className="flex flex-col gap-2 text-lg font-semibold text-gray-600">
          <p>Username: {user.username || "Loading..."}</p>
          <p>Email: {user.email || "Loading..."}</p>
          <p>ID: {params.id}</p>
        </div>
        <div className="flex gap-3 h-fit">
          <button
            onClick={() => router.push(`/profile`)}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-800 text-white rounded-md"
          >
            Go back
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;

// import React from "react";

// function Page({ params }: any) {
//   console.log("User ID in ProfileDetail:", params.id);
//   return (
//     <div className="w-full h-[100vh] relative">
//       <div className="mx-40 mt-20 flex flex-col gap-8">
//         <Image
//           className="size-[100px] rounded-full object-cover object-center border-2 border-white/40"
//           src="https://images.unsplash.com/photo-1516651000622-7f32fe80a57a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="profile image"
//         />
//         <div className="flex flex-col gap-2 text-lg font-semibold text-gray-600">
//           {/* <p>{params.user? (console.log("user id is: ", params.user)):<p>no user</p>}</p> */}
//           <p>Id: {params.id}</p>
//           {/* <p>ID Number: {params.id}</p> */}
//           {/* <p>Email: {params.email}</p> */}
//         </div>
//       </div>
//       <div className="bg-gray-800 rounded-3xl w-full h-[300px] absolute -top-[240] -z-10"></div>
//     </div>
//   );
// }

// export default Page;
