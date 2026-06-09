"use client";
import React, { useEffect, useState } from "react";
import { MdCategory, MdRefresh } from "react-icons/md";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { get_api, post_api } from "@/app/api_helper/api_helper";
import Loading from "../../../../Loading";
import { gold } from "@/app/color/color";
import Swal from "sweetalert2";

export default function ViewCategory({ setLoading, fetchAllCategories, loading, categories, setCategories, editId, setEditId, setActiveTab }) {

    const swalBase = {
        background: "#000000",
        color: "#d4af37",
        confirmButtonColor: "#d4af37",
        customClass: {
            popup: "rounded-2xl border border-yellow-600",
            title: "text-yellow-500",
            htmlContainer: "text-yellow-200",
            confirmButton: "font-bold tracking-wider"
        }
    };

    const DeleteCategory = async (category_id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This category will be permanently deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete it",
                cancelButtonText: "Cancel",
                background: "#000000",
                color: "#d4af37",
                confirmButtonColor: "#d4af37",
                cancelButtonColor: "#444",
                customClass: {
                    popup: "rounded-2xl border border-yellow-600",
                    title: "text-yellow-500",
                    htmlContainer: "text-yellow-200",
                    confirmButton: "font-bold tracking-wider"
                }
            });

            if (!confirm.isConfirmed) return;

            setLoading(true);

            const response = await post_api({
                body: {},
                params: category_id,
                path: "admin/category/delete-category"
            });

            // SUCCESS
            if (response?.data?.success) {

                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text:
                        response?.data?.msg ||
                        "Category deleted successfully",

                    timer: 1800,

                    showConfirmButton: false,

                    ...swalBase
                })
                fetchAllCategories();

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Delete Failed",
                    text: response?.data?.msg || "Something went wrong",
                    ...swalBase
                });
            }

        } catch (error) {

            console.log(error.message);

            const err = error?.response?.data;

            if (err?.code === "VALIDATION_ERROR") {

                Swal.fire({
                    icon: "warning",
                    title: "Validation Error",
                    text: err.msg,
                    ...swalBase
                });

            } else if (err?.code === "CATEGORY_NOT_FOUND") {

                Swal.fire({
                    icon: "error",
                    title: "Not Found",
                    text: err.msg,
                    ...swalBase
                });

            } else if (err?.code === "DATABASE_CONNECTION_ERROR") {

                Swal.fire({
                    icon: "error",
                    title: "Database Error",
                    text: err.msg,
                    ...swalBase
                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: err?.msg || "Something went wrong",
                    ...swalBase
                });
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">

            <section className="w-full">

                {/* Heading */}
                <div className="mb-8">

                    <h1
                        style={{ color: gold.mid }}
                        className="
                                text-3xl
                                lg:text-4xl
                                font-black
                                uppercase
                                tracking-[3px]
                                flex items-center justify-between
                            "
                    >
                        View Categories


                        <div className="flex items-center justify-between gap-5">
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-2
                                    rounded-2xl
                                    bg-[#111111]
                                    border
                                    border-[#2a2a2a]
                                    shadow-[0_0_25px_rgba(212,175,55,0.08)]
                                    w-fit
                                "
                            >
                                {/* Text */}
                                <span
                                    className="
                                    text-white
                                        capitalize
                                        font-semibold
                                        tracking-wide
                                        text-sm
                                        lg:text-base
                                        "
                                >
                                    Total Categories
                                </span>

                                {/* Count */}
                                <div
                                    style={{
                                        background: `linear-gradient(to bottom right, ${gold.light}, ${gold.base}, ${gold.dark})`,
                                    }}
                                    className="
                                            w-[30]
                                            h-[30]
                                            px-3
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            text-black
                                            font-semibold
                                            text-[18px]
                                            border
                                            border-[#f5d36b]
                                            "
                                >
                                    {categories.length}
                                </div>
                            </div>

                            <span onClick={() => fetchAllCategories()} style={{ background: gold.mid }} className=" cursor-pointer text-black tracking-wider text-[18px] capitalize px-5 py-3 rounded-2xl hover:scale-105 duration-500 flex items-center gap-1 font-semibold"><MdRefresh /> Refresh</span>
                        </div>
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Manage all product categories
                    </p>

                </div>

                {/* Empty State */}
                {
                    categories.length === 0 && !loading && (

                        <div
                            className="
                                    w-full
                                    py-20
                                    rounded-3xl
                                    border
                                    border-[#242424]
                                    bg-[#111111]
                                    text-center
                                "
                        >

                            <h2 className="text-2xl font-bold text-white">
                                No Categories Found
                            </h2>

                            <p className="text-gray-400 mt-3">
                                Add your first category
                            </p>

                        </div>
                    )
                }

                {/* Cards */}
                <div
                    className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            xl:grid-cols-4
                            gap-6
                        "
                >

                    {
                        categories.map((item, index) => (

                            <div
                                key={item.category_id}
                                className="
                                        group
                                        bg-[#111111]
                                        border
                                        border-[#242424]
                                        rounded-3xl
                                        overflow-hidden
                                        hover:border-[#d4af37]
                                        hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]
                                        duration-300
                                    "
                            >

                                {/* Image */}
                                <div className="relative h-[220] overflow-hidden">

                                    <img
                                        src={item.category_image}
                                        alt={item.category_name}
                                        className="
                                                w-full
                                                h-full
                                                object-contain
                                                object-center
                                                group-hover:scale-110
                                                duration-500
                                            "
                                    />

                                    {/* Overlay */}
                                    <div
                                        className="
                                                absolute
                                                inset-0
                                                bg-linear-to-t
                                                from-black/80
                                                via-black/20
                                                to-transparent
                                            "
                                    ></div>

                                    {/* Badge */}
                                    <div
                                        className="
                                                absolute
                                                top-4
                                                left-4
                                                px-4
                                                py-2
                                                rounded-full
                                                bg-[#d4af37]
                                                text-black
                                                text-sm
                                                font-bold
                                                flex
                                                items-center
                                                gap-2
                                            "
                                    >
                                        <MdCategory />
                                        Category
                                    </div>

                                </div>

                                {/* Content */}
                                <div className="p-5">

                                    <h2
                                        className="
                                                text-xl
                                                font-bold
                                                text-white
                                                line-clamp-1
                                            "
                                    >
                                        {item.category_name}
                                    </h2>

                                    {/* <p
                                            className="
                                                text-[#f5d36b]
                                                mt-2
                                                text-sm
                                                tracking-wide
                                            "
                                        >
                                            /{item.category_slug}
                                        </p> */}

                                    {/* Buttons */}
                                    <div className="flex items-center gap-3 mt-3">

                                        {/* Edit */}
                                        <button
                                            onClick={() => {
                                                setEditId(item.category_id)
                                                setActiveTab('add-category')
                                            }}
                                            className="
                                                    flex-1
                                                    py-3
                                                    rounded-2xl
                                                    bg-linear-to-r
                                                    from-[#f5d36b]
                                                    to-[#8b6a16]
                                                    text-black
                                                    font-bold
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    hover:scale-105
                                                    duration-300
                                                    cursor-pointer
                                                "
                                        >
                                            <FiEdit2 />
                                            Edit
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={() => DeleteCategory(item.category_id)}
                                            className="
                                                    w-[55]
                                                    h-[55]
                                                    rounded-2xl
                                                    bg-red-500/10
                                                    border
                                                    border-red-500/20
                                                    text-red-400
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xl
                                                    hover:bg-red-500
                                                    hover:text-white
                                                    duration-300
                                                    cursor-pointer
                                                "
                                        >
                                            <FiTrash2 />
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </section>
        </div>
    );
}