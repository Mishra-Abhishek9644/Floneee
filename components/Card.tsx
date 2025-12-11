"use client";
import React from "react";

const Card = ({ image, title, price }) => {
  return (
    <div className="p-4 flex flex-col mt-3 w-60 justify-center  ">
      <img src={image} alt={title} className="w-full h-70 object-contain shadow-sm hover:shadow-md transition " />
      <h2 className="font-semibold mt-2 truncate ">{title}</h2>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default Card;
