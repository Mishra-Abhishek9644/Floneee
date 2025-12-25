"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/Store/Slices/loginSlice";

export default function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const hydrate = async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          dispatch(setUser(data.user));
        }
      }
    };

    hydrate();
  }, [dispatch]);

  return <>{children}</>;
}
