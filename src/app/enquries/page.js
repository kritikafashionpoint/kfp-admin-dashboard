"use client";

import React, { useEffect, useState } from "react";
import { get_api } from "@/app/api_helper/api_helper";
import { Mail, Phone, User } from "lucide-react";
import Loading from "../../../Loading";
import Link from "next/link";

export default function Page() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchContacts = async () => {
        try {
            setLoading(true);

            const response = await get_api({
                params: null,
                path: "contact/view-contact",
            });

            if (response?.data?.status) {
                setContacts(response.data.data || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white lg:p-10 p-5">

            {loading && <Loading />}

            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-4xl font-bold mb-2"
                    style={{
                        color: "#f5df8b",
                        fontFamily: "Poppins",
                    }}
                >
                    Contact Messages
                </h1>

                <p className="text-gray-400">
                    View all customer enquiries and messages.
                </p>
            </div>

            {/* Table Container */}
            <div
                className="overflow-hidden rounded-3xl border"
                style={{
                    borderColor: "rgba(212,175,55,0.2)",
                    background: `
                        linear-gradient(
                            145deg,
                            rgba(10,10,10,0.98) 0%,
                            rgba(18,18,18,0.98) 50%,
                            rgba(30,22,8,0.98) 100%
                        )
                    `,
                    boxShadow:
                        "0 0 40px rgba(212,175,55,0.08)",
                }}
            >
                <div className="overflow-x-auto custom-scrollbar">

                    <table className="w-full min-w-[900]">

                        {/* Head */}
                        <thead>
                            <tr
                                style={{
                                    background:
                                        "rgba(212,175,55,0.08)",
                                }}
                            >
                                <th className="px-6 py-5 text-left text-[#f5df8b]">
                                    Sr.
                                </th>

                                <th className="px-6 py-5 text-left text-[#f5df8b]">
                                    Customer
                                </th>

                                <th className="px-6 py-5 text-left text-[#f5df8b]">
                                    Phone
                                </th>

                                <th className="px-6 py-5 text-left text-[#f5df8b]">
                                    Message
                                </th>

                                <th className="px-6 py-5 text-left text-[#f5df8b]">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-t hover:bg-white/3 duration-300"
                                        style={{
                                            borderColor:
                                                "rgba(212,175,55,0.08)",
                                        }}
                                    >
                                        <td className="px-7 py-5 text-gray-300">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                                    style={{
                                                        background:
                                                            "rgba(212,175,55,0.12)",
                                                    }}
                                                >
                                                    <User
                                                        size={18}
                                                        color="#d4af37"
                                                    />
                                                </div>

                                                <span className="font-medium">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <Link href={`tel:${item.phone}`}>
                                                <div className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-amber-300 duration-100">
                                                    <Phone
                                                        size={16}
                                                        color="#d4af37"
                                                    />
                                                    {item.phone}
                                                </div>
                                            </Link>
                                        </td>

                                        <td className="px-6 py-5 text-gray-300 max-w-[400]">
                                            <p className="line-clamp-2">
                                                {item.message}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5 text-gray-400">
                                            {new Date(
                                                item.created_at
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
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-16"
                                    >
                                        <div className="flex flex-col items-center">
                                            <Mail
                                                size={40}
                                                color="#d4af37"
                                            />

                                            <p className="mt-4 text-gray-400">
                                                No contact messages found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    );
}