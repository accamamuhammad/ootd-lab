"use client";

import { useState } from "react";
import { useEffect } from "react";

import Nav from "../app/components/Nav";

import Clothes from "../app/components/Clothes";
import Outfit from "../app/components/Outfits";

export default function Home() {
  const [togglePages, setTogglePages] = useState(true);

  const handleTogglePages = () => {
    setTogglePages(!togglePages);
  };

  return (
    <main className="w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-start">
      <section className="w-full space-y-4 z-50">
        <Nav />
        <div className="w-full flex flex-row items-center justify-center">
          <h1
            className={`${"w-1/2 border-b-2 pb-3 text-center cursor-pointer"} ${
              togglePages ? "border-b-black" : "border-b-white"
            }`}
            onClick={handleTogglePages}
          >
            Clothes
          </h1>
          <h1
            className={`${"w-1/2 border-b-2 pb-3 text-center cursor-pointer"} ${
              togglePages ? "border-b-white" : "border-b-black"
            }`}
            onClick={handleTogglePages}
          >
            Outfits
          </h1>
        </div>
      </section>
      <section className="w-full h-full overflow-scroll scrollbar-hide">
        <div className={togglePages ? "block" : "hidden"}>
          <Clothes />
        </div>
        <div className={togglePages ? "hidden" : "block"}>
          <Outfit />
        </div>
      </section>
    </main>
  );
}
