"use client";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { get_api, post_api } from "@/app/api_helper/api_helper";
import Loading from "../../../../Loading";
import { gold } from "@/app/color/color";
import Swal from "sweetalert2";
import { MdCategory, MdRefresh } from "react-icons/md";

export default function ViewProduct({ setLoading, fetchAllProducts, loading, products, setproducts, editId, setEditId, setActiveTab }) {

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

    const Deleteproduct = async (id) => {

        try {

            // =====================================
            // CONFIRM DELETE
            // =====================================

            const confirm = await Swal.fire({
                title: "Delete Product?",
                text: "This product and all images will be permanently deleted.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "Cancel",

                background: "#000000",
                color: "#d4af37",

                confirmButtonColor: "#d4af37",
                cancelButtonColor: "#444",

                customClass: {
                    popup:
                        "rounded-2xl border border-yellow-600",

                    title:
                        "text-yellow-500",

                    htmlContainer:
                        "text-yellow-200",

                    confirmButton:
                        "font-bold tracking-wider",

                    cancelButton:
                        "font-bold tracking-wider"
                }
            });

            if (!confirm.isConfirmed) return;

            // =====================================
            // LOADING
            // =====================================

            setLoading(true);

            // =====================================
            // API CALL
            // =====================================

            const response = await post_api({

                body: {},

                params: id,

                path: "admin/product/delete-product"
            });

            // =====================================
            // SUCCESS
            // =====================================

            if (response?.data?.success) {

                Swal.fire({

                    icon: "success",

                    title: "Product Deleted",

                    text:
                        response?.data?.msg ||
                        "Product deleted successfully",

                    timer: 1800,

                    showConfirmButton: false,

                    ...swalBase
                });

                fetchAllProducts();
            }

        } catch (error) {

            console.log(error);

            const err =
                error?.response?.data;

            // =====================================
            // INVALID ID
            // =====================================

            if (
                err?.code === "INVALID_ID"
            ) {

                Swal.fire({

                    icon: "warning",

                    title: "Invalid Product ID",

                    text:
                        err?.msg ||
                        "Invalid product id",

                    ...swalBase
                });
            }

            // =====================================
            // PRODUCT NOT FOUND
            // =====================================

            else if (
                err?.code ===
                "PRODUCT_NOT_FOUND"
            ) {

                Swal.fire({

                    icon: "error",

                    title: "Product Not Found",

                    text:
                        err?.msg ||
                        "This product does not exist",

                    ...swalBase
                });
            }

            // =====================================
            // CLOUDINARY ERROR
            // =====================================

            else if (
                err?.code ===
                "CLOUDINARY_DELETE_ERROR"
            ) {

                Swal.fire({

                    icon: "error",

                    title: "Image Delete Failed",

                    text:
                        err?.msg ||
                        "Cloudinary image delete failed",

                    ...swalBase
                });
            }

            // =====================================
            // DATABASE ERROR
            // =====================================

            else if (
                err?.code ===
                "DATABASE_ERROR"
            ) {

                Swal.fire({

                    icon: "error",

                    title: "Database Error",

                    text:
                        err?.msg ||
                        "Database operation failed",

                    ...swalBase
                });
            }

            // =====================================
            // SERVER ERROR
            // =====================================

            else if (
                err?.code ===
                "SERVER_ERROR"
            ) {

                Swal.fire({

                    icon: "error",

                    title: "Server Error",

                    text:
                        err?.msg ||
                        "Something went wrong",

                    ...swalBase
                });
            }

            // =====================================
            // UNKNOWN ERROR
            // =====================================

            else {

                Swal.fire({

                    icon: "error",

                    title: "Unexpected Error",

                    text:
                        err?.msg ||
                        "Something went wrong",

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
                        <div className="sm:inline hidden">View products</div>


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
                                    <span className="sm:inline hidden">Total</span> products
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
                                    {products.length}
                                </div>
                            </div>

                            <span onClick={() => fetchAllProducts()} style={{ background: gold.mid }} className=" cursor-pointer text-black tracking-wider text-[18px] capitalize px-5 py-3 rounded-2xl hover:scale-105 duration-500 flex items-center gap-1 font-semibold"><MdRefresh /> Refresh</span>
                        </div>
                    </h1>

                    <p className="text-gray-400 my-5">
                        Manage all product products
                    </p>

                </div>

                {/* Empty State */}
                {
                    products.length === 0 && !loading && (

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
                                No products Found
                            </h2>

                            <p className="text-gray-400 mt-3">
                                Add your first product
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
                        products?.map((item, index) => (

                            <div
                                key={item.id}
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
                                        src={item.index_image}
                                        alt={item.p_title}
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
                                        {item.p_title}
                                    </h2>

                                    <p
                                        className="
                                                text-[#f5d36b]
                                                mt-2
                                                line-clamp-2
                                                text-sm
                                                tracking-wide
                                            "
                                    >
                                        {item.p_short_description}
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex items-center gap-3 mt-3">

                                        {/* Edit */}
                                        <button
                                            onClick={() => {
                                                setEditId(item.id)
                                                setActiveTab('add-product')
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
                                            onClick={() => Deleteproduct(item.id)}
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