"use client";
import React, { useEffect, useState } from "react";
import { Crown, Mail, Lock } from "lucide-react";

import { useSelector } from "react-redux";
import { sw_server_error, sw_success, sw_warning } from "../sweet-alert/Swals";
import { post_api } from "../api_helper/api_helper";
import { useRouter } from "next/navigation";
import Loading from "../../../Loading";
import { gold } from "../color/color";
import Link from "next/link";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [otpTab, setOtpTab] = useState(false);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const token = useSelector((store) => store.adminAuth.token);
  console.log(token);

  useEffect(() => {
    if (token) {
      router.push('/dashboard')
    }
  }, [token])


  useEffect(() => {
    if (otpTab) {
      router.push("/verify-otp");
    }
  }, [otpTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userDataObj = {
      admin_email: adminEmail,
      admin_password: adminPassword,
    };

    try {
      const response = await post_api({
        body: userDataObj,
        params: null,
        path: "admin/auth/login",
      });

      if (response.data.success) {
        localStorage.setItem("admin_id", response.data.admin_id);

        setOtpTab(true);

        sw_success("Otp Sent To Your Email", "Check your mail to verify");
      } else {
        sw_warning("Warning", "Email and Password are Invalid");
      }
    } catch (error) {
      sw_server_error("Server Error", "Something went wrong");

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <section
        className="
                w-full
                px-0
                py-0
                sm:px-6
                sm:py-6
                lg:px-10
                lg:py-10
                flex
                items-center
                justify-center
                overflow-hidden
                relative
                bg-black
            "
      >
        {/* MAIN CARD */}
        <div
          className="
                    relative
                    rounded-2xl
                    w-full
                    max-w-330
                    grid
                    lg:grid-cols-2
                    bg-[#0f0f0f]
                    border
                    border-[#2b2b2b]
                    rounded-
                    overflow-hidden
                    shadow-[0_25px_80px_rgba(0,0,0,0.75)]
                "
        >
          {/* LEFT SIDE */}
          <div
            className="
                        hidden
                        lg:flex
                        flex-col
                        justify-between
                        relative
                        p-10
                        xl:p-12
                        overflow-hidden
                        bg-[#111111]
                        border-r
                        border-[#242424]
                    "
          >
            {/* TOP */}
            <div className="relative z-10">
              {/* TITLE */}
              <h1
                className="
                                text-5xl
                                xl:text-6xl
                                font-extrabold
                                leading-[1.05]
                                mt-10
                                capitalize
                            "
                style={{ color: gold.base }}
              >
                Kritika
                <br />
                Fashion Point
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                                mt-8
                                text-gray-400
                                leading-8
                                text-lg
                                max-w-[550]
                            "
              >
                Premium jewellery management dashboard crafted with luxury black
                and golden aesthetics for an elegant modern admin experience.
              </p>
            </div>

            {/* BOTTOM CARD */}
            <div
              className="
                            relative
                            z-10
                            mt-14
                            bg-black
                            border
                            rounded-[30]
                            p-8
                            shadow-[0_15px_40px_rgba(0,0,0,0.5)]
                        "
              style={{
                borderColor: "#2d2d2d",
              }}
            >
              <p
                className="
                                uppercase
                                tracking-[4]
                                text-sm
                                font-bold
                            "
                style={{ color: gold.base }}
              >
                Luxury Admin Panel
              </p>

              <h2
                className="
                                text-3xl
                                font-black
                                mt-4
                                leading-tight
                            "
                style={{ color: "#fff" }}
              >
                Elegant Royal Dashboard Experience
              </h2>

              <p className="text-gray-500 mt-5 leading-8">
                Manage jewellery collections, premium orders, customers and
                inventory with a refined luxury UI.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
                        flex
                        items-center
                        justify-center
                        p-0
                        sm:p-10
                        lg:p-12
                        xl:p-16
                        bg-[#070707]
                    "
          >
            {/* FORM BOX */}
            <div
              className="
                            w-full
                            rounded-3xl
                            max-w-[520]
                            bg-[#111111]
                            border
                            border-[#2a2a2a]
                            p-6
                            sm:p-8
                            lg:p-10
                            shadow-[0_20px_60px_rgba(0,0,0,0.65)]
                        "
            >
              {/* MOBILE LOGO */}
              <div className="lg:hidden block">
                <div className=" flex justify-center">
                  <div className=" flex items-center justify-center mb-8 bg-amber-200 text-black font-bold text-xl w-16 h-16 rounded-full border-2   p-3 border-amber-200">
                    KFP
                  </div>
                </div>
              </div>


              {/* HEADING */}
              <div className="text-center">
                <h2
                  className="
                                    text-3xl
                                    sm:text-4xl
                                    font-black
                                    uppercase
                                    tracking-[3]
                                "
                  style={{ color: gold.base }}
                >
                  Admin Login
                </h2>

                <p
                  className="
                                    text-gray-500
                                    mt-4
                                    leading-7
                                    text-sm
                                    sm:text-base
                                "
                >
                  Login to access Kritika Fashion Point dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className="mt-10">
                  <label
                    className="
                                    text-xs
                                    sm:text-sm
                                    uppercase
                                    tracking-[2]
                                    font-bold
                                "
                    style={{ color: gold.base }}
                  >
                    Email Address
                  </label>

                  <div
                    className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    sm:px-5
                                    py-4
                                    rounded-2xl
                                    bg-black
                                    border
                                    border-[#2d2d2d]
                                    focus-within:border-[#c9a227]
                                    duration-300
                                "
                  >
                    <Mail size={20} style={{ color: gold.base }} />

                    <input
                      onChange={(e) => setAdminEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      className="
                                        text-lg
                                        tracking-widest
                                        w-full
                                        bg-transparent
                                        outline-none
                                        text-white
                                        placeholder:text-gray-600
                                        
                                    "
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="mt-6">
                  <label
                    className="
                                    text-xs
                                    sm:text-sm
                                    uppercase
                                    tracking-[2]
                                    font-bold
                                "
                    style={{ color: gold.base }}
                  >
                    Password
                  </label>

                  <div
                    className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    sm:px-5
                                    py-4
                                    rounded-2xl
                                    bg-black
                                    border
                                    border-[#2d2d2d]
                                    focus-within:border-[#c9a227]
                                    duration-300
                                "
                  >
                    <Lock size={20} style={{ color: gold.base }} />

                    <input
                      onChange={(e) => setAdminPassword(e.target.value)}
                      type="password"
                      placeholder="Enter your password"
                      className="
                                          text-lg
                                        tracking-widest
                                        w-full
                                        bg-transparent
                                        outline-none
                                        text-white
                                        placeholder:text-gray-600
                                    "
                    />
                  </div>
                </div>

                {/* FORGOT */}
                <div className="mt-4 flex justify-end">
                  <Link href={"/forgot-password"}>
                    <button
                      type="button"
                      className="
                                    hover:text-amber-400
                                    duration-300
                                    cursor-pointer
                                    text-amber-300 text-md hover:scale-105  rounded px-5 py-1
                                "
                    >
                      Forgot Password?
                    </button>
                  </Link>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="
                                relative
                                w-full
                                overflow-hidden
                                py-4
                                rounded-2xl
                                mt-8
                                text-black
                                font-black
                                uppercase
                                tracking-[3]
                                hover:scale-[1.01]
                                duration-300
                                cursor-pointer
                            "
                  style={{
                    background: `linear-gradient(to right, ${gold.base}, ${gold.dark})`,
                  }}
                >
                  Send OTP
                  {/* SHINE */}
                  <div
                    className="
                                    absolute
                                    top-0
                                    left-[-120%]
                                    w-full
                                    h-full
                                    bg-white/20
                                    skew-x-12
                                    hover:left-[120%]
                                    duration-1000
                                "
                  />
                </button>
              </form>

              {/* FOOTER */}
              <p
                className="
                                text-center
                                text-xs
                                sm:text-sm
                                mt-7
                                tracking-[1]
                                text-gray-600
                            "
              >
                Premium Royal Admin Experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
