"use client";

import React, { useState } from "react";
import { HeaderData } from "../api_data/Headermenu";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function SideBar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMobileMenu(true)}
        className="
          lg:hidden
          fixed
          top-4
          right-4
          z-120
          w-12
          h-12
          rounded-2xl
          bg-[#111111]
          border
          border-[#2a2a2a]
          text-[#f5d36b]
          flex
          items-center
          justify-center
          text-2xl
          shadow-lg shadow-black
          backdrop-blur-xl
        "
      >
        <HiMenuAlt3 />
      </button>

      {/* OVERLAY */}
      <div
        onClick={() => setMobileMenu(false)}
        className={`
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          z-150
          duration-300
          lg:hidden

          ${mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      ></div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          lg:sticky
          top-0
          left-0
          z-200
          lg:h-[90vh]
          h-screen
          w-[280]
          sm:w-[300]
          lg:w-full
          bg-[#0b0b0b]
          border-r
          border-[#1f1f1f]
          overflow-y-scroll
          overflow-x-hidden
          custom-scrollbar
          duration-300

          ${mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* SIDEBAR HEADER */}
        <div
          className="
            flex
            items-center
            justify-between            
            px-5
            py-5
            border-b
            border-[#1b1b1b]
            lg:hidden
          "
        >
          <h2
            className="
              text-xl
              
              font-black
              tracking-[2]
              bg-linear-to-r
              from-[#fff4c7]
              via-[#f5d36b]
              to-[#8b6a16]
              bg-clip-text
              text-transparent
            "
          >
            KFP PANEL
          </h2>

          <button
            onClick={() => setMobileMenu(false)}
            className="
              w-10
              h-10
              rounded-xl
              bg-[#151515]
              border
              border-[#2a2a2a]
              text-[#f5d36b]
              flex
              items-center
              justify-center
              text-2xl
            "
          >
            <IoClose />
          </button>
        </div>

        {/* MENU */}
        <div className="px-3 py-5">
          <ul className="flex flex-col gap-2">
            {HeaderData?.map((item, index) => (
              <Link
                key={index}
                href={item.slug}
                onClick={() => setMobileMenu(false)}
              >
                <li
                  className="
                    group
                    flex
                    items-center
                    gap-2.5
                    px-4
                    py-4
                    rounded-2xl
                    text-[#cfcfcf]
                    hover:bg-linear-to-r
                    hover:from-[#1a1a1a]
                    hover:to-[#111111]
                    hover:text-[#f5d36b]
                    border
                    border-transparent
                    hover:border-[#2d2410]
                    duration-300
                    cursor-pointer
                    font-medium
                    tracking-wide
                  "
                >
                  {/* ICON */}
                  <span
                    className="
                      text-xl
                      min-w-[24]
                      group-hover:scale-110
                      duration-300
                    "
                  >
                    {item.icon}
                  </span>

                  {/* TITLE */}
                  <span
                    className="
                      text-sm
                      sm:text-base
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    {item.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-auto
            px-5
            py-6
            border-t
            border-[#1b1b1b]
          "
        >
          <div
            className="
              rounded-3xl
              bg-linear-to-br
              from-[#1a1a1a]
              to-[#101010]
              border
              border-[#2b2b2b]
              p-5
              shadow-[0_0_30px_rgba(212,175,55,0.08)]
            "
          >
            <p className="text-gray-400 text-sm">Admin Status</p>

            <h3
              className="
                text-[#f5d36b]
                text-2xl
                font-black
                mt-2
              "
            >
              Active
            </h3>

            <div className="flex items-center gap-2 mt-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-gray-500 text-xs tracking-wide">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
