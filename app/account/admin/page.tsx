"use client";

import { useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";

const AdminDashboard = () => {
  const user = useSelector((state: any) => state.login.currentUser);

  if (!user) return null; // server already verified

  return (
    <>
      <Breadcrumb />
      <div className="max-w-6xl mx-auto py-20">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="bg-gray-100 p-6 rounded-md">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-purple-600 font-semibold">Role: ADMIN</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
