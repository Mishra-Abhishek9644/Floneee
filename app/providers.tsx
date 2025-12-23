"use client";

import { Provider } from "react-redux";
import store from "@/Store";
import { Toaster } from "react-hot-toast";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="bottom-left" reverseOrder={false} />
    </Provider>
  );
}
