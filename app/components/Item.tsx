"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import trouser from "@/public/mock/trouser.png";
import shirt from "@/public/mock/shirt.png";
import shoe from "@/public/mock/shoe.png";
import tShirt from "@/public/mock/t-shirt.png";

interface ClothingItem {
  image: StaticImageData;
  name: string;
  condition: "New" | "Good" | "Worn";
  style: "Casual" | "Formal" | "Sport" | "Site";
  category: "tops" | "bottoms" | "shoes";
}

const FILTERS = [
  "All",
  "Tops",
  "Bottoms",
  "Shoes",
  "Casual",
  "Formal",
  "Sport",
  "New",
  "Good",
  "Worn",
] as const;
type Filter = (typeof FILTERS)[number];

const conditionStyles: Record<ClothingItem["condition"], string> = {
  New: "bg-green-50 text-green-700",
  Good: "bg-blue-50 text-blue-700",
  Worn: "bg-amber-50 text-amber-700",
};

const Item = () => {
  const [active, setActive] = useState<Filter>("All");

  const clothes: ClothingItem[] = [
    {
      image: shirt,
      name: "Blue Shirt",
      condition: "Good",
      style: "Formal",
      category: "tops",
    },
    {
      image: tShirt,
      name: "Black T-Shirt",
      condition: "New",
      style: "Casual",
      category: "tops",
    },
    {
      image: trouser,
      name: "Cargo Pants",
      condition: "New",
      style: "Casual",
      category: "bottoms",
    },
    {
      image: shoe,
      name: "Running Shoe",
      condition: "New",
      style: "Sport",
      category: "shoes",
    },
  ];

  const filtered = clothes.filter((item) => {
    if (active === "All") return true;
    const f = active.toLowerCase();
    return (
      item.category === f ||
      item.style.toLowerCase() === f ||
      item.condition.toLowerCase() === f
    );
  });

  return (
    <div className="px-4">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === f
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="mt-1 mb-3 flex items-center justify-between">
        <p className="text-sm text-gray-400">{filtered.length} items</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition-transform hover:-translate-y-0.5 hover:border-gray-300"
          >
            {/* Image area */}
            <div className="relative flex h-44 items-center justify-center bg-gray-50">
              <Image
                width={140}
                height={140}
                src={item.image}
                alt={item.name}
                className="object-contain"
              />
              <span
                className={`absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${conditionStyles[item.condition]}`}
              >
                {item.condition}
              </span>
            </div>

            {/* Info */}
            <div className="px-3 py-2.5">
              <h2 className="text-sm font-medium text-gray-900">{item.name}</h2>
              <span className="mt-1.5 inline-block rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                {item.style}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-gray-400">
          No items match this filter.
        </p>
      )}
    </div>
  );
};

export default Item;
