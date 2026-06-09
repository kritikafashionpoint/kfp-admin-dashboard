"use client";

import Link from "next/link";
import React from "react";
import {
    FaShoppingBag,
    FaUsers,
    FaBoxOpen,
    FaMoneyBillWave,
    FaArrowUp,
    FaChartLine,
    FaStar,
} from "react-icons/fa";

export default function Page() {
    const stats = [
        {
            title: "Today's Sales",
            value: "₹18,450",
            growth: "+12%",
            icon: <FaMoneyBillWave />,
        },
        {
            title: "Monthly Revenue",
            value: "₹4,82,000",
            growth: "+28%",
            icon: <FaChartLine />,
        },
        {
            title: "Total Orders",
            value: "1,248",
            growth: "+8%",
            icon: <FaShoppingBag />,
        },
        {
            title: "Total Customers",
            value: "842",
            growth: "+15%",
            icon: <FaUsers />,
        },
    ];

    const topProducts = [
        {
            name: "Bridal Necklace Set",
            sales: 124,
            revenue: "₹1,24,000",
        },
        {
            name: "Golden Bangles",
            sales: 98,
            revenue: "₹92,000",
        },
        {
            name: "Premium Earrings",
            sales: 84,
            revenue: "₹74,500",
        },
        {
            name: "Designer Rings",
            sales: 67,
            revenue: "₹52,000",
        },
    ];

    return (
        <section
            className="
        w-full
        lg:w-full
        overflow-x-hidden
        scroll-smooth
        custom-scrollbar
        bg-[#050505]
        text-white
      "
        >
            <div
                className="
          w-full
          max-w-[1320]
          min-w-[320]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-6
          pb-10
        "
            >
                {/* HEADER */}
                <div
                    className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-8
          "
                >
                    <div>
                        <h1
                            className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-black
                tracking-[3]
                uppercase
                bg-linear-to-r
                from-[#fff4c7]
                via-[#f5d36b]
                to-[#9f6d00]
                bg-clip-text
                text-transparent
              "
                        >
                            Dashboard Overview
                        </h1>

                        <p className="text-gray-400 mt-2 tracking-wide text-sm sm:text-base">
                            Welcome back, Admin 👑
                        </p>
                    </div>

                    <Link href={'/orders'}>
                        <button
                            className="
              px-6
              py-3
              rounded-2xl
              bg-linear-to-r
              from-[#f5d36b]
              via-[#d4af37]
              to-[#8b6a16]
              text-black
              font-bold
              shadow-[0_0_30px_rgba(212,175,55,0.35)]
              hover:scale-105
              duration-300
              w-full
              sm:w-fit
            "
                        >
                            Go To Orders
                        </button>
                    </Link>
                </div>

                {/* STATS */}
                <div
                    className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
                >
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="
                bg-[#111111]
                border
                border-[#242424]
                rounded-3xl
                p-5
                sm:p-6
                hover:border-[#d4af37]
                hover:shadow-[0_0_30px_rgba(212,175,55,0.12)]
                duration-300
              "
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-gray-400 text-sm tracking-wide">
                                        {item.title}
                                    </p>

                                    <h2
                                        className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      mt-3
                      wrap-break-words
                    "
                                    >
                                        {item.value}
                                    </h2>
                                </div>

                                <div
                                    className="
                    min-w-[56]
                    w-14
                    h-14
                    rounded-2xl
                    bg-linear-to-br
                    from-[#f5d36b]
                    to-[#8b6a16]
                    flex
                    items-center
                    justify-center
                    text-black
                    text-xl
                    shadow-lg
                  "
                                >
                                    {item.icon}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 flex-wrap text-[#f5d36b]">
                                <FaArrowUp />

                                <span className="font-semibold">
                                    {item.growth}
                                </span>

                                <span className="text-gray-500 text-sm">
                                    This Month
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ANALYTICS */}
                <div
                    className="
            grid
            grid-cols-1
            xl:grid-cols-[minmax(0,65%)_minmax(0,35%)]
            gap-5
            mt-8
          "
                >
                    {/* GRAPH */}
                    <div
                        className="
              bg-[#111111]
              border
              border-[#242424]
              rounded-3xl
              p-4
              sm:p-6
              lg:p-8
              overflow-x-auto
              custom-scrollbar
            "
                    >
                        <div className="flex items-center justify-between gap-3 mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
                                    Sales Analytics
                                </h2>

                                <p className="text-gray-400 text-sm mt-1">
                                    Monthly / Daily / Yearly Performance
                                </p>
                            </div>

                            <div
                                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-[#1a1a1a]
                  border
                  border-[#2a2a2a]
                  text-[#f5d36b]
                  text-sm
                "
                            >
                                2026
                            </div>
                        </div>

                        {/* GRAPH */}
                        <div
                            className="
                h-[350]
                min-w-[600]
                flex
                items-end
                gap-3
              "
                        >
                            {[
                                40, 70, 55, 90, 60, 110,
                                95, 130, 100, 140, 120, 170,
                            ].map((height, index) => (
                                <div
                                    key={index}
                                    className="
                    flex-1
                    flex
                    flex-col
                    items-center
                    gap-3
                  "
                                >
                                    <div
                                        style={{ height: `${height}px` }}
                                        className="
                      w-full
                      rounded-t-2xl
                      bg-linear-to-t
                      from-[#8b6a16]
                      via-[#d4af37]
                      to-[#fff1b0]
                      shadow-[0_0_20px_rgba(212,175,55,0.25)]
                      hover:scale-y-105
                      duration-300
                    "
                                    ></div>

                                    <span className="text-xs text-gray-500">
                                        {
                                            [
                                                "Jan", "Feb", "Mar", "Apr",
                                                "May", "Jun", "Jul", "Aug",
                                                "Sep", "Oct", "Nov", "Dec",
                                            ][index]
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SIDE ANALYTICS */}
                    <div className="flex flex-col gap-5">
                        {[
                            {
                                title: "Pending Orders",
                                value: "48",
                                color: "text-red-400",
                                bg: "bg-red-500/15",
                            },
                            {
                                title: "Completed Orders",
                                value: "48",
                                color: "text-green-400",
                                bg: "bg-green-500/15",
                            },
                            {
                                title: "Product Rating",
                                value: "4.9",
                                color: "text-[#f5d36b]",
                                bg: "bg-[#f5d36b]/10",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="
                  bg-[#111111]
                  border
                  border-[#242424]
                  rounded-3xl
                  p-5
                  sm:p-6
                "
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400">
                                            {item.title}
                                        </p>

                                        <h2 className="text-3xl sm:text-4xl font-black mt-2">
                                            {item.value}
                                        </h2>
                                    </div>

                                    <div
                                        className={`
                      w-14
                      h-14
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-2xl
                      ${item.bg}
                      ${item.color}
                    `}
                                    >
                                        {index === 2 ? <FaStar /> : <FaBoxOpen />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOP PRODUCTS */}
                <div
                    className="
            mt-8
            bg-[#111111]
            border
            border-[#242424]
            rounded-3xl
            p-4
            sm:p-6
          "
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">
                            Top Selling Products
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Best performing products this month
                        </p>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full min-w-[700]">
                            <thead>
                                <tr className="text-left border-b border-[#242424]">
                                    <th className="py-4 text-[#f5d36b]">
                                        Product
                                    </th>

                                    <th className="py-4 text-[#f5d36b]">
                                        Sales
                                    </th>

                                    <th className="py-4 text-[#f5d36b]">
                                        Revenue
                                    </th>

                                    <th className="py-4 text-[#f5d36b]">
                                        Growth
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {topProducts.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="
                      border-b
                      border-[#1b1b1b]
                      hover:bg-[#171717]
                      duration-300
                    "
                                    >
                                        <td className="py-5 font-medium">
                                            {item.name}
                                        </td>

                                        <td className="py-5 text-gray-300">
                                            {item.sales}
                                        </td>

                                        <td className="py-5 text-[#f5d36b] font-semibold">
                                            {item.revenue}
                                        </td>

                                        <td className="py-5">
                                            <span
                                                className="
                          px-3
                          py-1
                          rounded-full
                          bg-green-500/10
                          text-green-400
                          text-sm
                        "
                                            >
                                                +12%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}