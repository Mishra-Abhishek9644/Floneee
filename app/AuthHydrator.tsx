"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setHydrated } from "@/Store/Slices/loginSlice";

export default function AuthHydrator({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const hydrate = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            dispatch(setUser(data.user));
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setHydrated());
      }
    };


    hydrate();
  }, [dispatch]);

  return <>{children}</>;
}
