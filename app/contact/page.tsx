"use client";

import Breadcrumb from "@/components/Breadcrumb";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Failed to send message");
        return;
      }

      toast.success("Message sent successfully");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* SKELETON */
  if (loading) {
    return (
      <>
        <Breadcrumb />

        <div className="max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5 animate-pulse">
          <div className="md:h-[70vh] h-[500px] bg-gray-300 mb-6" />

          <div className="flex md:flex-row flex-col gap-4">
            {/* LEFT */}
            <div className="lg:w-[30%] md:w-[40%] w-full px-14 py-20 bg-gray-200 space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-300 rounded" />
                    <div className="h-3 w-28 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="lg:w-[70%] md:w-[60%] w-full bg-gray-200 lg:px-28 md:px-10 px-5 md:py-10 py-5">
              <div className="h-6 w-40 bg-gray-300 rounded mb-6" />

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-10 bg-gray-300 rounded" />
                  <div className="h-10 bg-gray-300 rounded" />
                </div>

                <div className="h-10 bg-gray-300 rounded" />
                <div className="h-32 bg-gray-300 rounded" />
                <div className="h-10 w-32 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* REAL PAGE */
  return (
    <>
      <Breadcrumb />

      <div className="max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5">

        {/* MAP */}
        <div className="md:h-[70vh] h-[500px] border w-full">
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/maps?q=Surat,India&output=embed"
          />
        </div>

        <div className="w-full flex md:flex-row flex-col gap-4 my-5">
          <div className="lg:w-[30%] md:w-[40%] w-full px-14 py-20 bg-gray-800 text-gray-100 grid gap-4">
            <div className="flex items-center gap-4">
              <Phone className="size-8 border p-2 rounded-full hover:bg-black hover:text-white" />
              <div>
                <p className="hover:text-purple-600">+012 345 678 102</p>
                <p className="hover:text-purple-600">+012 345 678 102</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="size-8 border p-2 rounded-full hover:bg-black hover:text-white" />
              <div>
                <p className="hover:text-purple-600">fashionera@email.com</p>
                <p className="hover:text-purple-600">fashionera.vercel.app</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="size-8 border p-2 rounded-full hover:bg-black hover:text-white" />
              <div>
                <p className="hover:text-purple-600">Address goes here,</p>
                <p className="hover:text-purple-600">street, Crossroad 123.</p>
              </div>
            </div>

            <div className="grid place-content-center gap-4">
              <div className="text-center text-xl font-semibold text-gray-200">
                Follow Us
              </div>
              <p className="flex gap-4 flex-wrap">
                <Facebook />
                <Twitter />
                <Instagram />
              </p>
            </div>
          </div>

          <div className="lg:w-[70%] md:w-[60%] w-full bg-gray-800 lg:px-28 md:px-10 px-5 md:py-10 py-5">
            <p className="text-2xl font-semibold text-gray-200 py-5">
              Get In Touch
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8 py-5 px-5 text-sm text-gray-100">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name*"
                    className="outline-hidden px-2 py-3 border border-gray-300"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    className="outline-hidden px-2 py-3 border border-gray-300"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject*"
                  className="outline-hidden px-2 py-3 border w-full border-gray-300"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message*"
                  className="h-40 w-full border border-gray-300 px-3 py-4 outline-hidden"
                />

                <button
                  type="submit"
                  className="uppercase bg-black/75 hover:bg-purple-600 text-white px-14 py-3 w-fit duration-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
