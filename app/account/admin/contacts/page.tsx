"use client";

import { useEffect, useState } from "react";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/contacts", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.contacts || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="bg-white p-6 shadow rounded mt-10">
      <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500">No messages yet</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="border border-gray-300 p-4 rounded"
            >
              <p><b>Name:</b> {c.name}</p>
              <p><b>Email:</b> {c.email}</p>
              <p><b>Subject:</b> {c.subject}</p>
              <p className="text-gray-600 mt-2">{c.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
