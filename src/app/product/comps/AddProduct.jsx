"use client";

import { get_api, post_api } from "@/app/api_helper/api_helper";
import { gold } from "@/app/color/color";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../../../../Loading";

export default function AddProduct({ editId, setEditId, loading, setLoading, categories, setCategories }) {


    const [productData, setProductData] = useState({
        p_title: "",
        p_slug: "",
        p_short_description: "",
        p_full_description: "",
        p_type: "single",
        is_top_selling: false,
        p_quantity: "",
        p_sale_price: "",
        p_customer_price: "",
        p_discount: "",
        p_advance_payment: 100,
        p_material: "",
        p_finishing: "",
        p_occasion: "",
        p_include_items: "",
        p_meta_title: "",
        p_meta_description: "",
        category_id: "",
    });

    const swalConfig = {
        background: "#0b0b0b",
        color: "#ffffff",
        confirmButtonColor: gold.base,
        cancelButtonColor: "#2d2d2d",
        customClass: {
            popup: "rounded-3xl border border-[#3a3a3a]",
            confirmButton: "rounded-xl px-6 py-3 font-bold",
            cancelButton: "rounded-xl px-6 py-3 font-bold",
        },
    };

    // INDEX IMAGE
    const [indexImage, setIndexImage] = useState(null);

    // GALLERY IMAGES
    const [galleryImages, setGalleryImages] = useState([]);

    // HANDLE CHANGE
    const handleChange = (e) => {

        const { name, value } = e.target;

        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // INDEX IMAGE CHANGE
    const handleIndexImage = (e) => {

        const file = e.target.files[0];

        if (file) {
            setIndexImage(file);
        }
    };

    // GALLERY IMAGE CHANGE
    const handleGalleryImages = (e) => {

        const files = Array.from(e.target.files);

        setGalleryImages((prev) => [...prev, ...files]);
    };

    // REMOVE GALLERY IMAGE
    const removeGalleryImage = (index) => {

        const updatedImages = [...galleryImages];

        updatedImages.splice(index, 1);

        setGalleryImages(updatedImages);
    };

    const resetForm = () => {

        setProductData({
            p_title: "",
            p_slug: "",
            p_short_description: "",
            p_full_description: "",
            p_type: "single",
            is_top_selling: false,
            p_quantity: "",
            p_sale_price: "",
            p_customer_price: "",
            p_discount: "",
            p_advance_payment: "",
            p_material: "",
            p_finishing: "",
            p_occasion: "",
            p_include_items: "",
            p_meta_title: "",
            p_meta_description: "",
            category_id: "",
        });

        setIndexImage(null);

        setGalleryImages([]);

        setEditId(null);
    };


    // SUBMIT FORM
    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        // NORMAL FIELDS
        formData.append("p_title", productData.p_title);

        formData.append("p_slug", productData.p_slug);


        formData.append(
            "p_short_description",
            productData.p_short_description
        );

        formData.append(
            "p_full_description",
            productData.p_full_description
        );

        formData.append("p_type", productData.p_type);

        formData.append(
            "is_top_selling",
            productData.is_top_selling
        );

        formData.append(
            "p_quantity",
            Number(productData.p_quantity)
        );

        formData.append(
            "p_sale_price",
            Number(productData.p_sale_price)
        );

        formData.append(
            "p_customer_price",
            Number(productData.p_customer_price)
        );

        formData.append(
            "p_discount",
            Number(productData.p_discount)
        );

        formData.append(
            "p_advance_payment",
            Number(productData.p_advance_payment)
        );

        formData.append(
            "category_id",
            productData.category_id
        );

        // ARRAY FIELDS
        formData.append(
            "p_material",
            productData.p_material
        );

        formData.append(
            "p_finishing",
            productData.p_finishing
        );

        formData.append(
            "p_occasion",
            productData.p_occasion
        );

        formData.append(
            "p_include_items",
            productData.p_include_items
        );

        formData.append(
            "p_meta_title",
            productData.p_meta_title
        );

        formData.append(
            "p_meta_description",
            productData.p_meta_description
        );

        // INDEX IMAGE
        if (indexImage) {
            formData.append("indexImage", indexImage);
        }

        // GALLERY IMAGES
        galleryImages.forEach((image) => {
            formData.append("galleryImages", image);
        });

        try {

            setLoading(true);

            // =====================================
            // UPDATE PRODUCT
            // =====================================

            if (editId) {

                const response = await post_api({
                    body: formData,
                    params: editId,
                    path: "admin/product/update-product",
                });

                if (response.data?.success) {

                    Swal.fire({
                        ...swalConfig,

                        icon: "success",

                        title: "Product Updated",

                        text:
                            response.data.msg ||
                            "Product updated successfully",

                        showConfirmButton: false,

                        timer: 1800,
                    });

                    resetForm();
                }

            }

            // =====================================
            // CREATE PRODUCT
            // =====================================

            else {

                const response = await post_api({
                    body: formData,
                    params: null,
                    path: "admin/product/create-product",
                });

                if (response.data?.success) {

                    Swal.fire({
                        ...swalConfig,

                        icon: "success",

                        title: "Product Added",

                        text:
                            response.data.msg ||
                            "Product added successfully",

                        showConfirmButton: false,

                        timer: 1800,
                    });

                    resetForm();
                }
            }

        } catch (error) {

            console.log(error);

            const errorCode =
                error?.response?.data?.code;

            const errorMessage =
                error?.response?.data?.msg ||
                "Something went wrong";


            // =====================================
            // VALIDATION ERROR
            // =====================================

            if (errorCode === "VALIDATION_ERROR") {

                Swal.fire({
                    ...swalConfig,

                    icon: "warning",

                    title: "Validation Error",

                    text: errorMessage,
                });
            }


            // =====================================
            // PRODUCT NOT FOUND
            // =====================================

            else if (
                errorCode === "PRODUCT_NOT_FOUND"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Product Not Found",

                    text: errorMessage,
                });
            }


            // =====================================
            // PRODUCT SLUG EXISTS
            // =====================================

            else if (
                errorCode === "PRODUCT_SLUG_EXISTS"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Slug Already Exists",

                    text: errorMessage,
                });
            }


            // =====================================
            // INDEX IMAGE REQUIRED
            // =====================================

            else if (
                errorCode === "INDEX_IMAGE_REQUIRED"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "warning",

                    title: "Index Image Missing",

                    text: errorMessage,
                });
            }


            // =====================================
            // INVALID CATEGORY
            // =====================================

            else if (
                errorCode === "INVALID_CATEGORY"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Invalid Category",

                    text: errorMessage,
                });
            }


            // =====================================
            // INVALID PRODUCT TYPE
            // =====================================

            else if (
                errorCode === "INVALID_PRODUCT_TYPE"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "warning",

                    title: "Invalid Product Type",

                    text: errorMessage,
                });
            }


            // =====================================
            // INVALID PRODUCT ID
            // =====================================

            else if (
                errorCode === "INVALID_ID"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Invalid Product ID",

                    text: errorMessage,
                });
            }


            // =====================================
            // FILE UPLOAD ERROR
            // =====================================

            else if (
                errorCode === "FILE_UPLOAD_ERROR"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Upload Failed",

                    text: errorMessage,
                });
            }


            // =====================================
            // FILE TOO LARGE
            // =====================================

            else if (
                errorCode === "FILE_TOO_LARGE"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "warning",

                    title: "File Too Large",

                    text: errorMessage,
                });
            }


            // =====================================
            // CLOUDINARY ERROR
            // =====================================

            else if (
                errorCode ===
                "CLOUDINARY_UPLOAD_ERROR"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Cloud Upload Failed",

                    text: errorMessage,
                });
            }


            // =====================================
            // DUPLICATE ENTRY
            // =====================================

            else if (
                errorCode === "DUPLICATE_ENTRY"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Duplicate Entry",

                    text: errorMessage,
                });
            }


            // =====================================
            // REQUIRED FIELDS MISSING
            // =====================================

            else if (
                errorCode ===
                "MISSING_REQUIRED_FIELDS"
            ) {

                Swal.fire({
                    ...swalConfig,

                    icon: "warning",

                    title: "Missing Required Fields",

                    text: errorMessage,
                });
            }


            // =====================================
            // SERVER ERROR
            // =====================================

            else {

                Swal.fire({
                    ...swalConfig,

                    icon: "error",

                    title: "Server Error",

                    text: errorMessage,
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

    const fetchProductById = async () => {
        try {
            setLoading(true)
            const response = await get_api({
                params: editId,
                path: 'admin/product/get-product'
            })
            if (response.data.data) {
                const pd = response.data.data
                setProductData({
                    p_title: pd.p_title,
                    p_slug: pd.p_slug,
                    p_short_description: pd.p_short_description,
                    p_full_description: pd.p_full_description,
                    p_type: pd.p_type,
                    is_top_selling: pd.is_top_selling,
                    p_quantity: pd.p_quantity,
                    p_sale_price: pd.p_sale_price,
                    p_customer_price: pd.p_customer_price,
                    p_discount: pd.p_discount,
                    p_advance_payment: pd.p_advance_payment,
                    p_material: pd.p_material,
                    p_finishing: pd.p_finishing,
                    p_occasion: pd.p_occasion,
                    p_include_items: pd.p_include_items,
                    p_meta_title: pd.p_meta_title,
                    p_meta_description: pd.p_meta_description
                })

                setIndexImage(pd.index_image || null);
                setGalleryImages(pd.gallery_images || []);


            }
        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (editId) {
            fetchProductById()
        }
    }, [editId])

    const updateDiscount = (dis) => {
        try {
            setLoading(true)
            setProductData((prev) => ({
                ...prev,
                p_customer_price: prev.p_sale_price - (prev.p_sale_price * dis) / 100
            }));
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <div className="min-h-screen bg-black text-white">

            {/* HEADING */}
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
                    {editId ? "Update Product Details" : "Add Product Details"}
                </h1>

                <p className="text-gray-400 mt-2">
                    {editId ? 'Update the Product Details' : 'Create New Product to Sell'}
                </p>

            </div>

            {/* FORM CONTAINER */}
            <div className="max-w-5xl bg-[#0b0b0b] p-8 rounded-3xl border border-[#2d2d2d]">

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    {/* TITLE */}
                    <div>
                        <label className="block mb-2">
                            Product Title
                        </label>

                        <input
                            type="text"
                            name="p_title"
                            value={productData.p_title}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* SLUG */}
                    <div>
                        <label className="block mb-2">
                            Product Slug
                        </label>

                        <div className="flex md:flex-row flex-col items-center lg:gap-3 gap-5">
                            <input
                                type="text"
                                name="p_slug"
                                value={productData.p_slug}
                                onChange={handleChange}
                                className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                            />
                            <span
                                type="button"
                                onClick={() =>
                                    setProductData({
                                        ...productData,
                                        p_slug: AutoSlug(productData.p_title),
                                    })
                                }
                                className="
                                    relative
                                    w-full
                                    overflow-hidden
                                    flex items-center gap-2
                                    justify-center
                                    px-6 py-3
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
                            </span>
                        </div>
                    </div>

                    {/* META TITLE */}
                    <div>
                        <label className="block mb-2 text-red-600">
                            Meta Title
                        </label>

                        <input
                            type="text"
                            name="p_meta_title"
                            value={productData.p_meta_title}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />

                    </div>

                    {/* META Description */}
                    <div>
                        <label className="block mb-2 text-red-600">
                            Meta Description
                        </label>

                        <input
                            type="text"
                            name="p_meta_description"
                            value={productData.p_meta_description}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* PRODUCT TYPE */}
                    <div>
                        <label className="block mb-2">
                            Product Type
                        </label>

                        <select
                            name="p_type"
                            value={productData.p_type}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        >
                            <option value="single">
                                Single
                            </option>

                            <option value="combo">
                                Combo
                            </option>
                        </select>
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="block mb-2">
                            Category
                        </label>

                        <select
                            disabled={editId}
                            required
                            name="category_id"
                            value={productData.category_id}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map((item) => (
                                <option
                                    key={item.category_id}
                                    value={item.category_id}
                                >
                                    {item.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* TOP SELLING */}
                    <div>
                        <label className="block mb-2">
                            Is Top Selling
                        </label>

                        <select
                            value={productData.is_top_selling}
                            onChange={(e) =>
                                setProductData((prev) => ({
                                    ...prev,
                                    is_top_selling:
                                        e.target.value === "true",
                                }))
                            }
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        >
                            <option value="false">
                                No
                            </option>

                            <option value="true">
                                Yes
                            </option>
                        </select>
                    </div>

                    {/* QUANTITY */}
                    <div>
                        <label className="block mb-2">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="p_quantity"
                            value={productData.p_quantity}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* SALE PRICE */}
                    <div>
                        <label className="block mb-2">
                            Sale Price
                        </label>

                        <input
                            type="number"
                            name="p_sale_price"
                            value={productData.p_sale_price}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* CUSTOMER PRICE */}
                    <div>
                        <label className="block mb-2">
                            Customer Price
                        </label>

                        <input
                            type="number"
                            name="p_customer_price"
                            value={productData.p_customer_price}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* DISCOUNT */}
                    <div className="relative">

                        <label className="block mb-2">
                            Discount %
                        </label>

                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                name="p_discount"
                                value={productData.p_discount}
                                onChange={handleChange}
                                placeholder="35"
                                className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-linear-to-r
                                from-yellow-500/10
                                via-yellow-black/50
                                to-black
                                border-2
                                text-black
                                text-md
                                font-semibold
                                tracking-wider
                                outline-none
                            "
                                style={{
                                    borderColor: gold.base,
                                    color: gold.light,
                                    boxShadow: `0 0 20px ${gold.base}30`
                                }}
                            />
                            <span onClick={() => updateDiscount(productData.p_discount)} className="bg-white text-black py-3.5 px-6 cursor-pointer hover:bg-gray-300 duration-100 font-semibold rounded-md ">Set</span>
                        </div>
                    </div>

                    {/* ADVANCE PAYMENT FIX */}
                    <div className="relative">

                        <label className="block mb-2">
                            Advance Payment
                        </label>

                        <input
                            type="number"
                            name="p_advance_payment"
                            value={productData.p_advance_payment}
                            onChange={handleChange}
                            placeholder="35"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-linear-to-r
                                from-yellow-500/10
                                via-yellow-black/50
                                to-black
                                border-2
                                text-black
                                text-md
                                font-semibold
                                tracking-wider
                                outline-none
                            "
                            style={{
                                borderColor: gold.base,
                                color: gold.light,
                                boxShadow: `0 0 20px ${gold.base}30`
                            }}
                        />
                    </div>

                    {/* INDEX IMAGE */}
                    <div>
                        <label className="block mb-2">
                            Index Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            name="indexImage"
                            onChange={handleIndexImage}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-amber-300
                                hover:scale-[1.02]
                                duration-300
                                text-black
                                cursor-pointer
                                font-bold
                            "
                        />

                        {indexImage && (

                            <div className="
                                mt-4
                                relative
                                w-32
                                h-32
                                rounded-2xl
                                overflow-hidden
                                border
                                border-gray-700
                            ">

                                <img
                                    src={
                                        indexImage instanceof File
                                            ? URL.createObjectURL(indexImage)
                                            : indexImage
                                    }
                                    alt="index"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            </div>
                        )}
                    </div>

                    {/* GALLERY IMAGES */}
                    <div>
                        <label className="block mb-2">
                            Gallery Images
                        </label>

                        <input
                            type="file"
                            name="galleryImages"
                            multiple
                            accept="image/*"
                            onChange={handleGalleryImages}
                            className="
                               w-full
                                p-3
                                rounded-xl
                                bg-amber-300
                                hover:scale-[1.02]
                                duration-300
                                text-black
                                cursor-pointer
                                font-bold
                            "
                        />
                    </div>

                    {/* GALLERY PREVIEW */}
                    {galleryImages.length > 0 && (

                        <div className="md:col-span-2">

                            <div className="
                                grid
                                grid-cols-2
                                sm:grid-cols-3
                                md:grid-cols-5
                                gap-4
                            ">

                                {galleryImages.map((image, index) => (

                                    <div
                                        key={index}
                                        className="
                                            relative
                                            border
                                            border-gray-700
                                            rounded-2xl
                                            overflow-hidden
                                        "
                                    >

                                        <img
                                            src={
                                                image instanceof File
                                                    ? URL.createObjectURL(image)
                                                    : image
                                            }
                                            alt="gallery"
                                            className="
                                                w-full
                                                h-36
                                                object-cover
                                            "
                                        />

                                        <span
                                            type="button"
                                            onClick={() =>
                                                removeGalleryImage(index)
                                            }
                                            className="
                                                absolute
                                                top-2
                                                right-2
                                                w-8
                                                h-8
                                                rounded-full
                                                bg-red-500
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            <FiTrash2 />
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>
                    )}

                    {/* SHORT DESCRIPTION */}
                    <div className="md:col-span-2">

                        <label className="block mb-2">
                            Short Description
                        </label>

                        <textarea
                            rows={3}
                            name="p_short_description"
                            value={productData.p_short_description}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />

                    </div>

                    {/* FULL DESCRIPTION */}
                    <div className="md:col-span-2">

                        <label className="block mb-2">
                            Full Description
                        </label>

                        <textarea
                            rows={5}
                            name="p_full_description"
                            value={productData.p_full_description}
                            onChange={handleChange}
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />

                    </div>

                    {/* MATERIAL */}
                    <div>
                        <label className="block mb-2">
                            Material (comma separated)
                        </label>

                        <input
                            type="text"
                            name="p_material"
                            value={productData.p_material}
                            onChange={handleChange}
                            placeholder="Gold, Alloy"
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* FINISHING */}
                    <div>
                        <label className="block mb-2">
                            Finishing (comma separated)
                        </label>

                        <input
                            type="text"
                            name="p_finishing"
                            value={productData.p_finishing}
                            onChange={handleChange}
                            placeholder="Glossy, Matte"
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* OCCASION */}
                    <div>
                        <label className="block mb-2">
                            Occasion (comma separated)
                        </label>

                        <input
                            type="text"
                            name="p_occasion"
                            value={productData.p_occasion}
                            onChange={handleChange}
                            placeholder="Wedding, Party"
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* INCLUDE ITEMS */}
                    <div>
                        <label className="block mb-2">
                            Include Items (comma separated)
                        </label>

                        <input
                            type="text"
                            name="p_include_items"
                            value={productData.p_include_items}
                            onChange={handleChange}
                            placeholder="Necklace, Earrings"
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-black
                                border
                                border-gray-700
                                outline-none
                            "
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="md:col-span-2">

                        <button
                            type="submit"
                            style={{
                                background: `linear-gradient(135deg, ${gold.dark}, ${gold.base}, ${gold.dark})`
                            }}
                            className="
                                w-full
                                mt-5
                                p-4
                                rounded-2xl
                                text-black
                                cursor-pointer
                                font-semibold
                                text-lg
                                hover:scale-[1.01]
                                duration-300
                            "
                        >
                            {editId ? 'Update' : "Add"} Product
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}