import React from "react";
import Image from "next/image";
import PlusIcon from "../../../public/plus.png";

const Nav = () => {
  return (
    <nav className="w-full py-5 px-6 flex flex-row items-center justify-between">
      <h1 className="font-medium text-xl">OOTD Lab</h1>
      <div className="p-2.5 bg-black hover:opacity-85 shadow-2xl rounded-full cursor-pointer">
        <Image src={PlusIcon} width={15} height={15} alt="plus" />
      </div>
    </nav>
  );
};

export default Nav;
