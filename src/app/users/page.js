"use client";

import React, { useEffect, useState } from "react";
import {
    Users,
    ShieldCheck,
    ShieldX,
} from "lucide-react";
import { get_api } from "../api_helper/api_helper";
import Loading from "../../../Loading";
import { MdRefresh } from "react-icons/md";
import { gold } from "../color/color";

export default function Page() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            setLoading(true);

            const response = await get_api({
                params: null,
                path: "user/view-users",
            });

            if (response?.data?.status) {
                setUsers(response.data.data || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="h-full bg-[#050505] p-4 md:p-8">

            {/* Loading */}
            {loading && (
                <Loading />
            )}

            {/* Header */}
            <div className="mb-8">

                <div className="flex items-center justify-between text-white" >
                    <h1 className="text-3xl md:text-4xl font-bold text-[#f8e7a1]">
                        Users Management
                    </h1>
                    <span onClick={() => getUsers()} style={{ background: gold.base }} className=" cursor-pointer text-black tracking-wider text-[18px] capitalize px-5 py-2 rounded-2xl hover:scale-105 duration-500 flex items-center gap-1 font-semibold"><MdRefresh /> Refresh</span>
                </div>

                <p className="text-zinc-400 mt-2">
                    View all registered users
                </p>

            </div>

            {/* Stats Card */}
            <div
                className="
                    mb-8
                    rounded-3xl
                    border
                    border-[#d4af37]/20
                    bg-[#0b0b0b]
                    p-6
                "
            >
                <div className="flex items-center gap-4">

                    <div
                        className="
                            h-14
                            w-14
                            rounded-full
                            flex
                            items-center
                            justify-center
                            bg-linear-to-r
                            from-[#d4af37]
                            to-[#f8e7a1]
                        "
                    >
                        <Users className="text-black" />
                    </div>

                    <div>
                        <p className="text-zinc-400">
                            Total Users
                        </p>

                        <h2 className="text-3xl font-bold text-white">
                            {users.length}
                        </h2>
                    </div>

                </div>
            </div>



            {/* No Data */}
            {!loading && users.length === 0 && (
                <div
                    className="
                        rounded-3xl
                        border
                        border-[#d4af37]/20
                        bg-[#0b0b0b]
                        py-20
                        text-center
                    "
                >
                    <Users
                        size={60}
                        className="
                            mx-auto
                            text-[#d4af37]
                            mb-4
                        "
                    />

                    <h3 className="text-white text-2xl font-semibold">
                        No Users Found
                    </h3>

                    <p className="text-zinc-500 mt-2">
                        No registered users available.
                    </p>
                </div>
            )}

            {/* Table */}
            {!loading && users.length > 0 && (
                <div
                    className="
                        overflow-x-auto
                        rounded-3xl
                        border
                        border-[#d4af37]/20
                        bg-[#0b0b0b]
                    "
                >
                    <table className="w-full">

                        <thead>
                            <tr
                                className="
                                    bg-linear-to-r
                                    from-[#d4af37]
                                    to-[#f8e7a1]
                                    text-black
                                "
                            >
                                <th className="px-6 py-4 text-left uppercase">
                                    Sr. No.
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Mobile
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Verified
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Created
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.user_id}
                                    className="
                                        border-b
                                        border-zinc-800
                                        hover:bg-zinc-900/50
                                        duration-300
                                    "
                                >
                                    <td className="px-10 py-5 text-zinc-300">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="font-medium text-white">
                                            {user.name}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5 text-zinc-300">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-5 text-zinc-300">
                                        {user.mobile}
                                    </td>

                                    <td className="px-6 py-5">
                                        {user.is_verified ? (
                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-green-500/10
                                                    text-green-400
                                                    text-sm
                                                "
                                            >
                                                <ShieldCheck size={15} />
                                                Verified
                                            </span>
                                        ) : (
                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-red-500/10
                                                    text-red-400
                                                    text-sm
                                                "
                                            >
                                                <ShieldX size={15} />
                                                Unverified
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-5 text-gray-400">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
}