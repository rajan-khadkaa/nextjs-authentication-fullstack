import React from "react";

function page({ params }: any) {
  return (
    <div className="w-full h-[100vh] relative">
      <div className="mx-40 mt-20 flex flex-col gap-8">
        <img
          className="size-[100px] rounded-full object-cover object-center border-2 border-white/40"
          src="https://images.unsplash.com/photo-1516651000622-7f32fe80a57a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile image"
        />
        <div className="flex flex-col gap-2 text-lg font-semibold text-gray-600">
          <p>Name: {params.username}</p>
          {/* <p>ID Number: {params.id}</p> */}
          <p>Email: {params.email}</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-3xl w-full h-[300px] absolute -top-[240] -z-10"></div>
    </div>
  );
}

export default page;
