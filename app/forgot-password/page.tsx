"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumb";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const submit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      toast.success(
        "If this email exists, a reset link has been sent"
      );
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const showError = touched && !email;

  return (
    <>
      <Breadcrumb />

      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-md border p-6 rounded">
          <h1 className="text-xl font-bold mb-2">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-600 mb-4">
            Enter the email associated with your account and we’ll send you a
            password reset link.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className={`border w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black ${
              showError ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          {showError && (
            <p className="text-red-500 text-sm mb-3">
              Email is required
            </p>
          )}

          <button
            onClick={submit}
            disabled={loading || !email}
            className="w-full bg-black text-white py-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            If the email exists, you’ll receive a reset link shortly.
          </p>
        </div>
      </div>
    </>
  );
}
