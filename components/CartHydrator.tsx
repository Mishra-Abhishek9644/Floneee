"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartList } from "@/Store/Slices/cartSlice";
import { RootState } from "@/Store";

const CartHydrator = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.login.currentUser
  );

  useEffect(() => {
    if (!currentUser?._id) return;

    const savedCart = JSON.parse(
      localStorage.getItem(`cart_${currentUser._id}`) || "[]"
    );

    dispatch(loadCartList(savedCart));
  }, [currentUser?._id, dispatch]);

  return null;
};

export default CartHydrator;
