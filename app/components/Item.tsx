"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface ClothingItem {
  id: string;
  name: string;
  condition: "New" | "Good" | "Worn";
  style: "Casual" | "Formal" | "Sport" | "Site";
  category: "tops" | "bottoms" | "shoes";
  image_url: string | null;
}

const FILTERS = ["All", "Tops", "Bottoms", "Shoes", "Casual", "Formal", "Sport", "New", "Good", "Worn"] as const;
type Filter = (typeof FILTERS)[number];

const conditionStyles: Record<ClothingItem["condition"], string> = {
  New: "bg-green-50 text-green-700",
  Good: "bg-blue-50 text-blue-700",
  Worn: "bg-amber-50 text-amber-700",
};

const Item = () => {
  const [active, setActive] = useState<Filter>("All");
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("clothing_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setClothes(data ?? []);
      setLoading(false);
    };

    fetchItems();
  }, []);

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
    <div>
      {/* Filters */}
      <div className="flex gap-2 px-3.5 overflow-x-auto py-3 scrollbar-hide">
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
      <div className="mt-2 mb-3 px-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {loading ? "Loading..." : `${filtered.length} items`}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid px-4 grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition-transform hover:-translate-y-0.5 hover:border-gray-300"
            >
              <div className="relative flex h-44 items-center justify-center bg-gray-50">
                {item.image_url ? (
                  <Image
                    fill
                    src={item.image_url}
                    alt={item.name}
                    className="object-contain p-4"
                  />
                ) : (
                  <span className="text-4xl text-gray-200">👕</span>
                )}
                <span
                  className={`absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${conditionStyles[item.condition]}`}
                >
                  {item.condition}
                </span>
              </div>
              <div className="px-3 py-2.5">
                <h2 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h2>
                <span className="mt-1.5 inline-block rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                  {item.style}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-gray-400">
          No items match this filter.
        </p>
      )}
    </div>
  );
};

export default Item;