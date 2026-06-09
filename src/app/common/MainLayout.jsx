"use client";

import React from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import SideBar from "./SideBar";

export default function MainLayout({ children }) {
  const path = usePathname();

  const hideHeader =
    path === "/" || path === "/verify-otp" || path === "/forgot-password";

  return (
    <Provider store={store}>
      {hideHeader ? (
        children
      ) : (
        <div className="w-full relative  bg-[#111]">
          {/* Header */}
          <Header />

          {/* Layout */}
          <div
            className="
            lg:h-[90vh]
            h-screen
            overflow-y-scroll
                flex
              "
          >
            {/* Sidebar */}
            <div
              className="
                  lg:w-[260]
                  md:w-0
                  w-0
                  shrink-0
                "
            >
              <SideBar />
            </div>

            {/* Main Content */}
            <main
              className="
                  flex-1
                  h-full
                  overflow-y-auto
                  overflow-x-hidden
                "
            >
              {children}
            </main>
          </div>
        </div>
      )}
    </Provider>
  );
}
