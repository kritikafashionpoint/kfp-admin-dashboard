"use client";
import { gold } from "@/app/color/color";
import React, { useEffect, useState } from "react";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import Loading from "../../../../Loading";
import { get_api, post_api } from "@/app/api_helper/api_helper";
import Swal from "sweetalert2";

export default function AddCategory({ editId, setEditId }) {
    const [formData, setFormData] = useState({
        category_name: "",
        category_slug: "",
        category_image: null,
    });

    const [preview, setPreview] = useState(null);

    // COMMON SWAL STYLE
    const swalConfig = {
        background: "#000000",
        color: "#d4af37",
        confirmButtonColor: "#d4af37",
        customClass: {
            popup:
                "rounded-2xl border border-yellow-600",
            title: "text-yellow-500",
            htmlContainer: "text-yellow-200",
            confirmButton:
                "font-bold tracking-wider"
        }
    };

    // Handle Text Input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData({
                ...formData,
                category_image: file,
            });

            setPreview(URL.createObjectURL(file));
        }
    };

    const [loading, setLoading] = useState(false)

    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const sendData = new FormData();

            // APPEND DATA
            sendData.append(
                "category_name",
                formData.category_name
            );

            sendData.append(
                "category_slug",
                formData.category_slug
            );

            // IMAGE IF EXISTS
            if (formData.category_image) {

                sendData.append(
                    "category_image",
                    formData.category_image
                );
            }

            // IF EDIT MODE
            if (editId) {

                sendData.append(
                    "category_id",
                    editId
                );
            }

            // API RESPONSE
            let result;

            // UPDATE CATEGORY
            if (editId) {

                result = await post_api({
                    body: sendData,
                    params: null,
                    path: "admin/category/update-category"
                });

            }

            // CREATE CATEGORY
            else {

                result = await post_api({
                    body: sendData,
                    params: null,
                    path: "admin/category/create-category"
                });
            }

            // SUCCESS
            if (result?.data?.success) {

                Swal.fire({
                    icon: "success",
                    title: editId
                        ? "Category Updated"
                        : "Category Created",
                    text: result.data.msg,
                    background: "#000000",
                    color: "#d4af37",
                    confirmButtonColor: "#d4af37",
                    confirmButtonText: "Done",
                    customClass: {
                        popup: "rounded-2xl border border-yellow-600",
                        title: "text-yellow-500",
                        htmlContainer: "text-yellow-200",
                        confirmButton:
                            "font-bold tracking-wider"
                    }
                });

                // RESET FORM
                setFormData({
                    category_name: "",
                    category_slug: "",
                    category_image: null,
                });

                setPreview(null);

                // RESET EDIT ID
                if (editId) {
                    setEditId(null);
                }
            }

        } catch (error) {

            console.log(error);

            const err = error?.response?.data;


            // VALIDATION ERROR
            if (err?.code === "VALIDATION_ERROR") {

                Swal.fire({
                    icon: "warning",
                    title: "Validation Error",
                    text: err.msg,
                    ...swalConfig
                });
            }

            // CATEGORY EXISTS
            else if (
                err?.code === "CATEGORY_ALREADY_EXISTS"
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Slug Already Exists",
                    text: err.msg,
                    ...swalConfig
                });
            }

            // CATEGORY NOT FOUND
            else if (
                err?.code === "CATEGORY_NOT_FOUND"
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Category Not Found",
                    text: err.msg,
                    ...swalConfig
                });
            }

            // DUPLICATE ENTRY
            else if (
                err?.code === "DUPLICATE_ENTRY"
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Duplicate Entry",
                    text: err.msg,
                    ...swalConfig
                });
            }

            // DATABASE ERROR
            else if (
                err?.code === "DATABASE_CONNECTION_ERROR"
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Database Error",
                    text: err.msg,
                    ...swalConfig
                });
            }

            // IMAGE ERROR
            else if (
                err?.code === "IMAGE_UPLOAD_ERROR"
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Image Upload Failed",
                    text: err.msg,
                    ...swalConfig
                });
            }

            // DEFAULT ERROR
            else {

                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text:
                        err?.msg ||
                        "Something went wrong",
                    ...swalConfig
                });
            }

        } finally {

            setLoading(false);
        }
    };

    const AutoSlug = (category_name) => {
        return category_name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "") // remove special characters
            .replace(/\s+/g, "-") // replace spaces with -
            .replace(/-+/g, "-"); // remove multiple -
    };


    const fetchCategoryById = async () => {
        try {

            setLoading(true);

            const response = await get_api({
                params: editId,
                path: `admin/category/view-category-by-id`
            });

            // Success
            if (response?.data?.success) {

                const categoryData = response.data.data;

                // Set form values
                setFormData({
                    category_name: categoryData.category_name || '',
                    category_slug: categoryData.category_slug || '',
                })

                setPreview(categoryData.category_image)

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response?.data?.msg || "Failed to fetch category"
                });

            }

        } catch (error) {

            console.log(error.message || "Server Error");

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.msg || "Something went wrong"
            });

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        if (editId) {
            fetchCategoryById()
        }
    }, [editId])

    return (
        <>
            {loading && <Loading />}

            <section className="w-full h-fit ">

                <div className="mb-8">

                    <h1
                        style={{ color: gold.mid }}
                        className="
                        text-3xl
                        lg:text-4xl
                        font-black
                        uppercase
                        tracking-[3px]
                    "
                    >
                        {editId ? 'Update Categories' : 'Add Categories'}
                    </h1>

                    <p className="text-gray-400 mt-2">
                        {editId ? 'Update Existing Category' : 'Create new product category'}
                    </p>

                </div>
                <div className="max-w-3xl bg-[#0b0b0b] border border-[#2d2d2d] rounded-2xl p-4 lg:p-8 shadow-xl">

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Category Name
                            </label>

                            <input
                                type="text"
                                name="category_name"
                                value={formData.category_name}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                className="
                                w-full
                                bg-[#111]
                                border border-[#333]
                                rounded-xl
                                px-4 py-4
                                tracking-widest
                                text-md
                                text-white
                                outline-none
                                focus:border-yellow-500
                                duration-300
                            "
                            />
                        </div>

                        {/* Category Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Category Slug
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    name="category_slug"
                                    value={formData.category_slug}
                                    onChange={handleChange}
                                    placeholder="Enter category slug"
                                    className="
                                w-full
                                bg-[#111]
                                border border-[#333]
                                rounded-xl
                                px-4 py-4
                                tracking-widest
                                text-md
                                text-white
                                outline-none
                                focus:border-yellow-500
                                duration-300
                            "
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            category_slug: AutoSlug(formData.category_name),
                                        })
                                    }
                                    className="
        relative
        overflow-hidden
        flex items-center gap-2
        px-6 py-4
        rounded-xl
        font-bold
        tracking-[2px]
        text-white
        cursor-pointer
        transition-all duration-300
        bg-linear-to-r
        from-pink-700
        via-fuchsia-700
        to-purple-700
        border border-pink-400
    "
                                >
                                    {/* Glow Effect */}
                                    <span
                                        className="
        absolute inset-0
        bg-white/10
        opacity-0
        hover:opacity-100
        transition duration-300
    "
                                    ></span>

                                    {/* Content */}
                                    <span className="relative z-10 flex items-center justify-center gap-1"><MdOutlineAutoFixHigh size={20} /> Auto</span>
                                </button>
                            </div>
                        </div>

                        {/* Image Preview */}
                        {preview && (
                            <div>
                                <p className="text-gray-300 mb-3 text-sm">Image Preview</p>

                                <div className="w-48 h-48 rounded-2xl overflow-hidden border border-[#333] bg-[#111]">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Category Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Category Image
                            </label>

                            <input
                                name="category_image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="
                                w-full
                                bg-[#111]
                                cursor-pointer
                                hover:scale- 
                                border border-[#333]
                                rounded-xl
                                px-4 py-4
                                tracking-widest
                                text-md
                                text-gray-300
                                file:mr-4
                                file:py-2
                                file:px-4
                                file:rounded-lg
                                file:border-0
                                file:bg-[#E6C766]
                                file:text-black
                                file:font-semibold
                                hover:file:bg-[#D4AF37]
                                duration-500
                                transition-all
                            "
                            />
                        </div>



                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{ background: `linear-gradient(to bottom right, ${gold.dark},${gold.base},${gold.dark})` }}
                            className="
                                w-full
                                mt-5
                                p-4
                                rounded-2xl
                                font-semibold
                                text-black
                                cursor-pointer
                                text-lg
                                hover:scale-[1.01]
                                duration-300
                            "
                        >
                            {editId ? 'Update Category' : 'Add Category'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
