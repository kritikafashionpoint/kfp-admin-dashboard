import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
    relative
    w-screen
    bg-[#050505]/95
    border-t border-[#2b2b2b]
    backdrop-blur-3xl
    overflow-hidden
  "
    >
      {/* GOLDEN GLOW EFFECTS */}
      <div
        className="
      absolute
      top-[-120]
      left-[-120]
      w-[280]
      h-[280]
      bg-[#d4af37]/10
      blur-[120]
      rounded-full
      pointer-events-none
    "
      ></div>

      <div
        className="
      absolute
      bottom-[-120]
      right-[-120]
      w-[300]
      h-[300]
      bg-[#f5d36b]/10
      blur-[140]
      rounded-full
      pointer-events-none
    "
      ></div>

      {/* PREMIUM TOP SHINE */}
      <div
        className="
      h-[2]
      w-full
      bg-linear-to-r
      from-transparent
      via-[#f5d36b]
      to-transparent
      shadow-[0_0_25px_rgba(245,211,107,0.8)]
    "
      ></div>

      <div
        className="
      max-w-[1320]
      min-w-[320]
      mx-auto
      px-4 sm:px-6
      py-10
      relative
      z-10
    "
      >
        <div
          className="
        grid
        lg:grid-cols-[35%_25%_20%_20%]
        md:grid-cols-2
        grid-cols-1
        gap-10
      "
        >
          {/* BRAND */}
          <div>
            <h2
              className="
            text-4xl
            font-black
            tracking-[5]
            uppercase
            bg-linear-to-r
            from-[#fff7d6]
            via-[#f5d36b]
            to-[#8b6a16]
            bg-clip-text
            text-transparent
            drop-shadow-[0_0_15px_rgba(245,211,107,0.35)]
          "
            >
              KFP
            </h2>

            <p
              className="
            text-gray-400
            mt-5
            leading-[30]
            text-sm
          "
            >
              Premium Admin Dashboard for managing orders, customers, analytics,
              products, and complete eCommerce operations with luxury UI
              experience.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-7">
              {[<FaInstagram />, <FaFacebookF />, <FaWhatsapp />].map(
                (icon, index) => (
                  <div
                    key={index}
                    className="
                group
                relative
                w-12 h-12
                rounded-2xl
                bg-[#0f0f0f]
                border border-[#2a2a2a]
                flex items-center justify-center
                text-[#f5d36b]
                overflow-hidden
                hover:scale-110
                duration-300
                cursor-pointer
                shadow-[0_0_20px_rgba(212,175,55,0.12)]
              "
                  >
                    <div
                      className="
                  absolute
                  inset-0
                  bg-linear-to-br
                  from-[#f5d36b]
                  to-[#8b6a16]
                  opacity-0
                  group-hover:opacity-100
                  duration-300
                "
                    ></div>

                    <span className="relative z-10 group-hover:text-black duration-300">
                      {icon}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              className="
            text-white
            font-bold
            text-lg
            mb-6
            tracking-[2]
          "
            >
              Quick Links
            </h3>

            <ul className="flex flex-col gap-4">
              {[
                "Dashboard",
                "Orders",
                "Customers",
                "Products",
                "Analytics",
              ].map((item, index) => (
                <li
                  key={index}
                  className="
                text-gray-400
                hover:text-[#f5d36b]
                hover:translate-x-2
                duration-300
                cursor-pointer
                text-sm
                tracking-wide
                flex items-center gap-2
              "
                >
                  <span className="text-[#d4af37]">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3
              className="
            text-white
            font-bold
            text-lg
            mb-6
            tracking-[2]
          "
            >
              Contact
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div
                  className="
                relative
                w-11 h-11
                rounded-2xl
                bg-[#0f0f0f]
                border border-[#2a2a2a]
                text-[#f5d36b]
                flex items-center justify-center
                shadow-[0_0_15px_rgba(212,175,55,0.12)]
              "
                >
                  <FaEnvelope />
                </div>

                <p className="text-gray-400 text-sm break-all">
                  support@kfp.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="
                relative
                w-11 h-11
                rounded-2xl
                bg-[#0f0f0f]
                border border-[#2a2a2a]
                text-[#f5d36b]
                flex items-center justify-center
                shadow-[0_0_15px_rgba(212,175,55,0.12)]
              "
                >
                  <FaPhoneAlt />
                </div>

                <p className="text-gray-400 text-sm">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* STATUS CARD */}
          <div>
            <div
              className="
            relative
            bg-[#0f0f0f]
            border border-[#2b2b2b]
            rounded-[28]
            p-6
            overflow-hidden
            shadow-[0_0_35px_rgba(212,175,55,0.08)]
          "
            >
              {/* INNER SHINE */}
              <div
                className="
              absolute
              top-[-40]
              right-[-40]
              w-[120]
              h-[120]
              bg-[#f5d36b]/10
              blur-[60]
              rounded-full
            "
              ></div>

              <p className="text-gray-400 text-sm relative z-10">
                Current Status
              </p>

              <h2
                className="
              text-5xl
              font-black
              text-[#f5d36b]
              mt-3
              relative z-10
              drop-shadow-[0_0_18px_rgba(245,211,107,0.35)]
            "
              >
                Online
              </h2>

              <div className="flex items-center gap-2 mt-5 relative z-10">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                <span className="text-gray-400 text-sm">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
        mt-10
        pt-6
        border-t border-[#1b1b1b]
        flex
        flex-col md:flex-row
        items-center
        justify-between
        gap-4
      "
        >
          <p
            className="
          text-gray-500
          text-sm
          tracking-wide
          text-center md:text-left
        "
          >
            © 2026 Kritika Fashion Point. All Rights Reserved.
          </p>

          <p
            className="
          text-[#f5d36b]
          text-sm
          tracking-[4]
          uppercase
          drop-shadow-[0_0_12px_rgba(245,211,107,0.35)]
        "
          >
            Luxury Admin Experience
          </p>
        </div>
      </div>
    </footer>
  );
}
