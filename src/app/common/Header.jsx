"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { HeaderData } from "../api_data/Headermenu";
import { FaUser } from "react-icons/fa";
import { gold } from "../color/color";
import { adminLogout } from "../redux/slices/adminAuthSlice";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = useSelector((store) => store.adminAuth.token);

  const path = usePathname();

  const router = useRouter();

  const menuData = [
    { name: "dashboard", link: "dashboard" },
    { name: "doctors", link: "doctors" },
    { name: "services", link: "services" },
    { name: "blogs", link: "blogs" },
    { name: "appointments", link: "appointments" },
    { name: "enquiries", link: "enquiries" },
  ];

  useEffect(() => {
    if (!token && path !== "/verify-otp" && path !== "/forgot-password") {
      router.push("/");
    }
  }, [token, path]);

  useEffect(() => {
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  const dispatch = useDispatch();

  const logoutAdmin = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",

        background: "#0a0a0a",
        color: "#d4af37",

        showCancelButton: true,

        confirmButtonText: "Yes, Logout",
        cancelButtonText: "Cancel",

        confirmButtonColor: "#d4af37",
        cancelButtonColor: "#1f1f1f",

        customClass: {
          popup: "rounded-3xl border border-yellow-700 shadow-2xl",
          title: "text-yellow-500 font-bold",
          htmlContainer: "text-yellow-200",
          confirmButton:
            "font-bold text-black px-6 py-2 rounded-xl",
          cancelButton:
            "font-bold text-yellow-500 border border-yellow-700 px-6 py-2 rounded-xl",
        },

      }).then((result) => {

        if (result.isConfirmed) {

          dispatch(adminLogout());

          localStorage.removeItem("admin_id");

          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            icon: "success",

            background: "#0a0a0a",
            color: "#d4af37",

            timer: 1500,
            showConfirmButton: false,

            customClass: {
              popup:
                "rounded-3xl border border-yellow-700 shadow-2xl",
              title: "text-yellow-500 font-bold",
              htmlContainer: "text-yellow-200",
            },
          });
        }
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-999 w-full">
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.9)] -z-10"></div>
      )}


      {/* Pc Header */}
      <div className="lg:block hidden">
        <div
          className="
      w-full
      bg-[#0a0a0a]/95
      backdrop-blur-xl
      border-b border-[#2b2b2b]
      shadow-[0_8px_30px_rgba(0,0,0,0.45)]
    "
        >
          <div className="max-w-[1500] mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            {/* for pc */}
            <div className="lg:block hidden">
              <h1
                className="
            
          lg:text-2xl
          text-2xl
          font-black
          tracking-[2px]
          cursor-pointer
          flex items-center gap-2
        "
              >
                <span className="text-white flex items-center gap-3">
                  <FaUser style={{ color: gold.mid }} size={20} /> Admin
                </span>

                <span
                  className="
            bg-linear-to-r
            from-[#f5d36b]
            via-[#d4af37]
            to-[#8b6a16]
            bg-clip-text
            text-transparent
          "
                >
                  Dashboard
                </span>
              </h1>
            </div>


            {/* Logo */}
            {/* for mobile and small devices */}
            <div className="lg:hidden block">
              <h1
                className="
          lg:text-2xl
          text-2xl
          font-black
          tracking-[2px]
          cursor-pointer
          flex items-center gap-2
        "
              >
                <span className="text-white flex items-center gap-3">
                  <FaUser style={{ color: gold.mid }} size={20} />
                </span>

                <span
                  className="
            bg-linear-to-r
            from-[#f5d36b]
            via-[#d4af37]
            to-[#8b6a16]
            bg-clip-text
            text-transparent
          "
                >
                  Dashboard
                </span>
              </h1>
            </div>


            {/* Profile */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-4 relative"
            >
              <div className="flex items-center gap-3 group">
                {/* Avatar */}
                <div
                  className="
              w-10 h-10
              rounded-full
              bg-linear-to-br
              from-[#f5d36b]
              via-[#d4af37]
              to-[#8b6a16]
              flex items-center justify-center
              text-black
              text-sm
              tracking-wider
              group-hover:scale-105
              duration-300
              cursor-pointer
              font-bold
            "
                >
                  K
                </div>

                {/* Name */}
                <div className="relative">
                  <p
                    className="
                text-white
                font-extrabold
                sm:block hidden
                text-xl
                cursor-pointer
                hover:text-[#f5d36b]
                duration-300
                tracking-[3]

              "
                  >
                    <span>KFP</span>
                  </p>

                  {/* Dropdown */}
                  <div
                    className={`
                ${menuOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-3"
                      }

                absolute
                top-[65]
                right-0
                w-[240]
                z-100
                rounded-2xl
                overflow-hidden
                bg-white
                backdrop-blur-2xl
                border border-[#2a2a2a]
                shadow-[0_15px_40px_rgba(0,0,0,0.6)]
                duration-300
              `}
                  >
                    <ul className="p-2 flex flex-col gap-1">
                      {HeaderData.map((item, index) => {
                        return (
                          <Link key={index} href={item.slug} className="w-full">
                            <li
                              onClick={() => setMenuOpen(false)}
                              className="
                          px-4 py-3
                          rounded-xl
                          text-black
                          hover:bg-[#1d1d1d]
                          hover:text-[#f5d36b]
                          duration-300
                          capitalize
                          font-medium
                          text-md
                          flex items-center gap-2
                        "
                            >
                              {item.icon}
                              {item.title}
                            </li>
                          </Link>
                        );
                      })}

                      <li
                        onClick={logoutAdmin}
                        className="
                    px-4 py-3
                    rounded-xl
                    text-red-600
                    hover:bg-red-700
                    hover:text-white
                    duration-300
                    cursor-pointer
                    text-md
                    font-medium
                    flex items-center gap-2
                  "
                      >
                        <FaUser size={18} />
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </header>
  );
}
