"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/Store/Slices/cartSlice";
import { AppDispatch, RootState } from "@/Store";

const CartHydrator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: RootState) => state.login.currentUser
  );

  useEffect(() => {
    if (!currentUser?._id) return;
    dispatch(fetchCart());
  }, [currentUser?._id, dispatch]);

  return null;
};

export default CartHydrator;
