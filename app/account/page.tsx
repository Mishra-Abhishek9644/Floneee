"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/Store/Slices/loginSlice";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";

const Page = () => {
  const user = useSelector(
    (state: any) => state.login.currentUser
  );
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user) {
    return (
        <>
        <Breadcrumb />
<div className="pt-24 p-10 flex flex-col items-center">
        <p>You are not logged in</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded"
        >
          Go to Login
        </button>
      </div>
      </>
    );
  }

  return (
    <>
    <Breadcrumb />
    <div className="p-10 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl font-bold">
        Welcome, {user.username}
      </h1>
      <p className="text-gray-600">{user.email}</p>

      <button
        onClick={() => {
          dispatch(logout());
          router.push("/login");
        }}
        className="mt-6 px-6 py-2 bg-gray-200 hover:bg-purple-600 hover:text-white rounded"
      >
        Logout
      </button>
    </div>
    </>
  );
};

export default Page;
