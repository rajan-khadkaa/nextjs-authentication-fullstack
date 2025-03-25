"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({ _id: "", username: "", email: "" });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/loggedUser");
      setUser(res.data.user);
      console.log("User info received from backend: ", res.data.user);
    } catch (error) {
      console.log(
        "Error: ",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  const handleLogout = async () => {
    const askUser = confirm("Are you sure you want to logout?");
    if (askUser) {
      try {
        await axios.get("/api/users/logout");
        router.push("/login");
      } catch (error) {
        console.log(
          "Error: ",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
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
        <div className="flex justify-between gap-2 text-lg font-semibold text-gray-600">
          <div className="flex flex-col gap-2">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* <p>ID: {user._id}</p> */}
          </div>
          <div className="flex gap-3 h-fit">
            <button
              onClick={() => router.push(`/profile/${user._id}`)}
              className="px-6 py-2 bg-sky-600 hover:bg-sky-800 text-white rounded-md"
            >
              View Profile
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
      <div className="bg-gray-800 rounded-3xl w-full h-[300px] absolute -top-[240] -z-10"></div>
    </div>
  );
}

export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// function Page() {
//   const router = useRouter();
//   const [user, setUser] = useState();

//   useEffect(() => {
//     getUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const res = await axios.get("/api/users/loggedUser");
//       setUser(res.data.user._id);
//       console.log("User info received from backend: ", res.data.user);
//     } catch (error: any) {
//       console.log("Error: ", error.mesage);
//     }
//   };

//   const handleLogout = async () => {
//     const askUser = confirm("Are you sure you want to logout?");
//     if (askUser) {
//       try {
//         const response = await axios.get("/api/users/logout");
//         router.push("/login");
//       } catch (error: any) {
//         console.log("Error: ", error.message);
//       }
//     }
//   };
//   return (
//     <div className="w-full h-[100vh] relative">
//       <div className="mx-40 mt-20 flex flex-col gap-8">
//         <Image
//           className="size-[100px] rounded-full object-cover object-center border-2 border-white/40"
//           src="https://images.unsplash.com/photo-1516651000622-7f32fe80a57a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="profile image"
//         />
//         <div className="flex justify-between gap-2 text-lg font-semibold text-gray-600">
//           <div className="flex flex-col gap-2">
//             {/* <h2>User Profile</h2> */}
//             {/* <p>{user.username}</p>
//             <p>{user.email}</p> */}
//             <p>{user}</p>
//           </div>
//           <div className="flex gap-3 h-fit">
//             <button
//               onClick={() => router.push(`/profile/${user}`)}
//               className="px-6 py-2 bg-sky-600 hover:bg-sky-800 text-white rounded-md"
//             >
//               View Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-800 rounded-3xl w-full h-[300px] absolute -top-[240] -z-10"></div>
//     </div>
//   );
// }

// export default Page;
