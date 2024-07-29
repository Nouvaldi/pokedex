"use client";

import React from "react";
import ScrollToTop from "react-scroll-up";
import { IoMdArrowDropup } from "react-icons/io";

export const ScrollToTopButton = () => {
  return (
    <div className="relative z-[999]">
      <ScrollToTop showUnder={200} easing="easeOutCubic" duration={3000}>
        <div className="bg-white p-3 rounded-full drop-shadow-md text-3xl">
          <IoMdArrowDropup />
        </div>
      </ScrollToTop>
    </div>
  );
};
