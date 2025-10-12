"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

import Mockup1 from "../../../public/Mockup1.png";
import Mockup2 from "../../../public/Mockup2.png";
import Mockup3 from "../../../public/Mockup3.png";
import Mockup4 from "../../../public/Mockup4.png";
import Mockup5 from "../../../public/Mockup5.png";
import Mockup6 from "../../../public/Mockup6.png";
import Mockup7 from "../../../public/Mockup7.png";
import Mockup8 from "../../../public/Mockup8.png";
import Mockup9 from "../../../public/Mockup9.png";
import Mockup10 from "../../../public/Mockup10.png";
import Mockup11 from "../../../public/Mockup11.png";
import Mockup12 from "../../../public/Mockup12.png";

const Clothes = () => {
  const [currentDetails, setCurrentDetails] = useState({});
  const [currentCondition, setCurrentCondition] = useState("");
  const [toggleOverlay, setToggleOverlay] = useState(false);

  const defaultItem = {
    name: "Green T",
    type: "T-shirt",
    condition: "Good",
    lastWorn: "12/10/2025",
    image: Mockup1,
  };

  const clothes = [
    {
      name: "Green T",
      type: "T-shirt",
      condition: "Good",
      lastWorn: "12/10/2025",
      image: Mockup1,
    },
    {
      name: "Black Hoodie",
      type: "Hoodie",
      condition: "New",
      lastWorn: "10/10/2025",
      image: Mockup2,
    },
    {
      name: "Blue Jeans",
      type: "Jeans",
      condition: "Worn",
      lastWorn: "08/10/2025",
      image: Mockup3,
    },
    {
      name: "White Shirt",
      type: "Shirt",
      condition: "New",
      lastWorn: "05/10/2025",
      image: Mockup4,
    },
    {
      name: "Red Jacket",
      type: "Jacket",
      condition: "Good",
      lastWorn: "02/10/2025",
      image: Mockup5,
    },
    {
      name: "Grey Shorts",
      type: "Shorts",
      condition: "Good",
      lastWorn: "28/09/2025",
      image: Mockup6,
    },
    {
      name: "Denim Jacket",
      type: "Jacket",
      condition: "New",
      lastWorn: "20/09/2025",
      image: Mockup7,
    },
    {
      name: "Black Pants",
      type: "Pants",
      condition: "Good",
      lastWorn: "15/09/2025",
      image: Mockup8,
    },
    {
      name: "Yellow Tee",
      type: "T-shirt",
      condition: "New",
      lastWorn: "10/09/2025",
      image: Mockup9,
    },
    {
      name: "Brown Sweater",
      type: "Sweater",
      condition: "Good",
      lastWorn: "01/09/2025",
      image: Mockup10,
    },
    {
      name: "White Sneakers",
      type: "Shoes",
      condition: "Good",
      lastWorn: "28/08/2025",
      image: Mockup11,
    },
    {
      name: "Black Dress",
      type: "Dress",
      condition: "New",
      lastWorn: "15/08/2025",
      image: Mockup12,
    },
    {
      name: "Green T",
      type: "T-shirt",
      condition: "Good",
      lastWorn: "12/10/2025",
      image: Mockup1,
    },
    {
      name: "Black Hoodie",
      type: "Hoodie",
      condition: "New",
      lastWorn: "10/10/2025",
      image: Mockup2,
    },
    {
      name: "Blue Jeans",
      type: "Jeans",
      condition: "Worn",
      lastWorn: "08/10/2025",
      image: Mockup3,
    },
    {
      name: "White Shirt",
      type: "Shirt",
      condition: "New",
      lastWorn: "05/10/2025",
      image: Mockup4,
    },
    {
      name: "Red Jacket",
      type: "Jacket",
      condition: "Good",
      lastWorn: "02/10/2025",
      image: Mockup5,
    },
    {
      name: "Grey Shorts",
      type: "Shorts",
      condition: "Good",
      lastWorn: "28/09/2025",
      image: Mockup6,
    },
    {
      name: "Denim Jacket",
      type: "Jacket",
      condition: "New",
      lastWorn: "20/09/2025",
      image: Mockup7,
    },
    {
      name: "Black Pants",
      type: "Pants",
      condition: "Good",
      lastWorn: "15/09/2025",
      image: Mockup8,
    },
    {
      name: "Yellow Tee",
      type: "T-shirt",
      condition: "New",
      lastWorn: "10/09/2025",
      image: Mockup9,
    },
    {
      name: "Brown Sweater",
      type: "Sweater",
      condition: "Good",
      lastWorn: "01/09/2025",
      image: Mockup10,
    },
    {
      name: "White Sneakers",
      type: "Shoes",
      condition: "Good",
      lastWorn: "28/08/2025",
      image: Mockup11,
    },
    {
      name: "Black Dress",
      type: "Dress",
      condition: "New",
      lastWorn: "15/08/2025",
      image: Mockup12,
    },
  ];

  const handleViewDetails = (details) => {
    setToggleOverlay(true);
    setCurrentDetails(details);

    if (details.condition === "Worn") {
      setCurrentCondition("Worn");
    } else if (details.condition === "Good") {
      setCurrentCondition("Good");
    } else if (details.condition === "New") {
      setCurrentCondition("New");
    }
  };

  return (
    <section className="h-full m-3 grid gap-5 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {clothes.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() =>
              handleViewDetails({
                name: item.name,
                type: item.type,
                condition: item.condition,
                lastWorn: item.lastWorn,
                image: item.image,
              })
            }
            className="relative aspect-square cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        );
      })}
      {/* Overlay */}
      <div
        className={`${
          toggleOverlay ? "block" : "hidden"
        } ${"w-80 aspect-square  z-50 bg-neutral-50 shadow-2xl absolute left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2"}`}
      >
        <p
          onClick={() => setToggleOverlay(false)}
          className="w-full text-right pb-3 pt-4 pr-5 text-xl font-bold cursor-pointer bg-neutral-50 rounded-t-2xl text-black absolute -top-14 mb-5"
        >
          X
        </p>
        <Image
          src={currentDetails.image || defaultItem.image}
          alt={currentDetails.name || defaultItem.name}
          fill
          className="object-contain"
        />
        <div className="w-80 pt-0 pb-4 px-4 flex flex-row justify-between items-center bg-neutral-50 z-50 shadow-2xl rounded-b-2xl absolute -bottom-14">
          <h1 className="leading-8 font-bold text-xl md:text-2xl xl:text-3xl mt-2">
            {currentDetails.name || defaultItem.name}
          </h1>
          <p
            className={`${
              currentCondition === "Worn"
                ? "bg-red-500 text-white"
                : currentCondition === "Good"
                ? "bg-yellow-400 text-black"
                : "bg-green-500 text-white"
            } ${"py-1 px-1.5 font-medium rounded-lg"}`}
          >
            {currentCondition || defaultItem.condition}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clothes;
