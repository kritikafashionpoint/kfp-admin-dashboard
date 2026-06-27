'use client'

import React, { useEffect, useState } from 'react'
import { post_api } from '../api_helper/api_helper'
import Loading from '../../../Loading'
import Swal from 'sweetalert2'
import { MdRefresh } from 'react-icons/md'
import { X } from 'lucide-react'

export default function Page() {

    const [loading, setLoading] = useState(true)

    const [requests, setRequests] = useState([])

    const [selectedImage, setSelectedImage] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const fetchRequests = async () => {

        try {

            setLoading(true)

            const response = await post_api({
                body: {},
                params: null,
                path: "user/view-replacement-requests",
            })

            if (response.data.success) {
                setRequests(response.data.data || [])
            }

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const openImage = (image) => {
        setSelectedImage(image)
        setShowModal(true)
    }

    const closeImage = () => {

        setShowModal(false)

        setTimeout(() => {

            setSelectedImage(null)

        }, 300)

    }

    const handleApprove = async (id) => {

        const result = await Swal.fire({

            title: "Approve Replacement?",
            text: "Replacement request will be approved.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            confirmButtonText: "Approve"

        })

        if (!result.isConfirmed) return

        try {

            Swal.fire({
                title: "Please Wait...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            })

            const response = await post_api({

                body: {
                    replacement_request_id: id
                },

                params: null,

                path: "user/approve-replacement"

            })

            Swal.close()

            if (response.data.success) {

                await Swal.fire({

                    icon: "success",
                    title: "Approved"

                })

                fetchRequests()

            }

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: error?.response?.data?.message || "Something went wrong"

            })

        }

    }
    const handleReject = async (id) => {

        const result = await Swal.fire({

            title: "Reject Replacement?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc2626",

            confirmButtonText: "Reject"

        })

        if (!result.isConfirmed) return

        try {

            Swal.fire({

                title: "Please Wait...",

                allowOutsideClick: false,

                didOpen: () => Swal.showLoading()

            })

            const response = await post_api({

                body: {

                    replacement_request_id: id

                },

                params: null,

                path: "user/reject-replacement"

            })

            Swal.close()

            if (response.data.success) {

                await Swal.fire({

                    icon: "success",

                    title: "Rejected"

                })

                fetchRequests()

            }

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: error?.response?.data?.message || "Something went wrong"

            })

        }

    }

    return (

        <div className="min-h-screen bg-black p-8">

            {loading && <Loading />}

            {
                selectedImage && (

                    <div
                        onClick={closeImage}
                        className={`fixed inset-0 z-999 bg-black/90 flex items-center justify-center transition-all duration-300 ${showModal ? "opacity-100" : "opacity-0"}`}
                    >

                        <button
                            onClick={closeImage}
                            className="absolute top-6 right-6 bg-red-600 text-white p-2 rounded-full"
                        >
                            <X />
                        </button>

                        <img
                            src={selectedImage}
                            className={`max-w-[70vw] max-h-[90vh] rounded-xl transition-all duration-300 ${showModal ? "scale-100" : "scale-75"
                                }`}
                        />

                    </div>

                )
            }

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-white">

                    Replacement Requests

                </h1>

                <button
                    onClick={fetchRequests}
                    className="bg-yellow-400 hover:scale-105 duration-300 text-black px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
                >

                    <MdRefresh size={22} />

                    Refresh

                </button>

            </div>

            <div className="overflow-x-auto rounded-3xl border border-yellow-600 bg-white shadow-2xl">

                <table className="w-full min-w-[1700]">

                    <thead>

                        <tr className="bg-black text-white">

                            <th className="p-4">Customer</th>

                            <th className="p-4">Product</th>

                            <th className="p-4">Reason</th>

                            <th className="p-4">Description</th>

                            <th className="p-4">Proof Image</th>

                            <th className="p-4">Status</th>

                            <th className="p-4">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {requests.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="text-center py-16 text-gray-500 text-lg"
                                >
                                    No Replacement Requests Found
                                </td>

                            </tr>

                        ) : (

                            requests.map((request) => (

                                <tr
                                    key={request.id}
                                    className="bg-amber-100 hover:bg-amber-50 duration-300 border-b border-yellow-300"
                                >

                                    {/* Customer */}

                                    <td className="p-5">

                                        <div>

                                            <p className="font-bold text-lg">
                                                {request.customer_name}
                                            </p>

                                            <p className="text-sm text-gray-700">
                                                {request.mobile}
                                            </p>

                                        </div>

                                    </td>

                                    {/* Product */}

                                    <td className="p-5">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={request.product_image}
                                                alt={request.title}
                                                className="w-20 h-20 rounded-xl object-cover border"
                                            />

                                            <div>

                                                <p className="font-semibold text-lg">
                                                    {request.title}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    Qty : {request.quantity}
                                                </p>

                                                <p className="text-sm font-medium text-yellow-700">
                                                    Ordered Price : ₹{request.p_customer_price}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Order #{request.order_id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Reason */}

                                    <td className="p-5 font-medium whitespace-pre-wrap">

                                        {request.reason}

                                    </td>

                                    {/* Description */}

                                    <td className="p-5 max-w-sm">

                                        <p className="line-clamp-4 break-words">

                                            {request.description}

                                        </p>

                                    </td>

                                    {/* Proof Image */}

                                    <td className="p-5">

                                        <img
                                            src={request.image}
                                            alt="Replacement Proof"
                                            onClick={() => openImage(request.image)}
                                            className="w-24 h-24 rounded-xl object-cover cursor-pointer hover:scale-105 duration-300 border border-gray-300"
                                        />

                                    </td>

                                    {/* Status */}

                                    <td className="p-5">

                                        <span
                                            className={`px-4 py-2 rounded-full capitalize font-semibold
                    ${request.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : request.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : request.status === "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                }
                `}
                                        >
                                            {request.status.replace(/_/g, " ")}
                                        </span>

                                    </td>

                                    {/* Action */}

                                    <td className="p-5">

                                        {request.status === "pending" ? (

                                            <div className="flex gap-3">

                                                <button
                                                    onClick={() => handleApprove(request.id)}
                                                    className="bg-green-700 hover:bg-green-800 duration-200 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() => handleReject(request.id)}
                                                    className="bg-red-700 hover:bg-red-800 duration-200 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        ) : (

                                            <span
                                                className={`font-semibold ${request.status === "approved"
                                                    ? "text-green-700"
                                                    : "text-red-700"
                                                    }`}
                                            >
                                                {request.status === "approved"
                                                    ? "Approved"
                                                    : "Rejected"}
                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    )

}