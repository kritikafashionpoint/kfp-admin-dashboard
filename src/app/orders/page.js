'use client'

import React, { useEffect, useState } from 'react'
import { post_api } from '../api_helper/api_helper'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {
  Truck,
  XCircle,
  Package,
  CreditCard,
  X
} from 'lucide-react'
import Loading from '../../../Loading'
import { MdRefresh } from 'react-icons/md'
import Swal from 'sweetalert2'

export default function Page() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)


  const [selectedImage, setSelectedImage] = useState(null)
  const fetchAllOrders = async () => {

    try {

      setLoading(true)

      const response = await post_api({
        body: {},
        params: null,
        path: 'user/view-orders',
      })
      console.log(response.data.data[0]?.address);


      if (response?.data?.success) {
        setOrders(response.data.data || [])
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  const handleCancelOrder = (orderId) => {
    console.log('Cancel Order:', orderId)

    // API Call Here
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])



  const [showModal, setShowModal] = useState(false)

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


  const handleOutForDelivery = async (order_id) => {

    const result = await Swal.fire({
      title: "Mark as Out For Delivery?",
      text: "This order status will be updated.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Please wait...",
        text: "Updating order status",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await post_api({
        body: { order_id },
        params: null,
        path: "user/out-for-delivery",
      });

      Swal.close();

      if (response?.data?.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.data?.message || "Order marked as Out for Delivery",
          timer: 2000,
          showConfirmButton: false,
        });

        fetchAllOrders();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response?.data?.message || "Failed to update order status",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black lg:p-6 p-8 ">


      {loading && <Loading />}

      {
        selectedImage && (
          <div className='relative'>
            <div
              onClick={() => setShowModal(false)}
              className={`fixed inset-0 z-999 flex items-center justify-center p-3
       duration-1000
      ${showModal
                  ? 'bg-black/90 opacity-100'
                  : 'bg-black/0 opacity-0'
                }`}
            >

              <button
                onClick={closeImage}
                className={`absolute top-5 right-5 bg-red-600 text-white p-2 rounded-full
        transition-all duration-300
        ${showModal ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}
              >
                <X size={24} />
              </button>

              <img
                src={selectedImage}
                alt=""
                className={`max-w-[50vw] max-h-[90vh] rounded-xl border border-white shadow-2xl
        transition-all duration-300 ease-out
        ${showModal
                    ? 'scale-100 opacity-100'
                    : 'scale-75 opacity-0'
                  }`}
              />

            </div>
          </div>
        )
      }

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">
          Orders <span className='sm:inline hidden'>Management</span>
        </h1>
        <span onClick={() => fetchAllOrders()} className='flex items-center gap-2 bg-amber-300 px-4 py-2 cursor-pointer rounded-xl hover:scale-105 duration-300 font-semibold'><MdRefresh size={22} /> Refresh</span>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-yellow-600 bg-white shadow-2xl">

        <table className="w-full min-w-[1600]">

          <thead>

            <tr className="bg-black text-white">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>



          </thead>

          <tbody>

            {orders
              .filter(order => order.payment_status === "paid")
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((order) =>

                order.items.map((item) => (
                  <React.Fragment key={item.order_item_id}>

                    {/* Main Row */}
                    <tr className=" bg-amber-200 hover:bg-amber-100 duration-300">

                      <td className="p-4 font-semibold">
                        #{order.order_id}
                      </td>

                      <td className="p-4">
                        {order.customer.name}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">

                          <img
                            src={item.product_image}
                            alt=""
                            className="w-14 h-14 rounded-lg object-cover"
                          />

                          <div>
                            <p className="text-md text-black font-semibold">
                              {item.product_title}
                            </p>

                            <p className="text-md text-black font-semibold">
                              Qty : {item.quantity}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="p-4 font-bold text-yellow-600">
                        ₹{item.price}
                      </td>

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700">
                          {order.order_status}
                        </span>
                      </td>

                      <td className="p-4">
                        <td className="p-4">

                          {order.order_status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleOutForDelivery(order.order_id)
                              }
                              className="px-4 py-2 rounded-lg bg-green-700 text-white"
                            >
                              🚚 Out For Delivery
                            </button>
                          )}

                          {order.order_status === "pending" && (
                            <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">
                              Pending
                            </span>
                          )}

                          {order.order_status === "out_for_delivery" && (
                            <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">
                              🚚 Out For Delivery
                            </span>
                          )}

                          {order.order_status === "replace_requested" && (
                            <span className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 font-medium">
                              🔄 Replacement Requested
                            </span>
                          )}

                          {order.order_status === "replacement_approved" && (
                            <span className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium">
                              ✅ Replacement Approved
                            </span>
                          )}

                          {order.order_status === "replacement_rejected" && (
                            <span className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium">
                              ❌ Replacement Rejected
                            </span>
                          )}

                          {order.order_status === "delivered" && (
                            <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium">
                              ✅ Delivered
                            </span>
                          )}

                          {order.order_status === "cancelled" && (
                            <span className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium">
                              ❌ Cancelled
                            </span>
                          )}

                        </td>
                      </td>

                    </tr>

                    {/* Detail Row */}
                    <tr className="bg-gray-50 border-b-40">

                      <td colSpan={6} className="p-5">

                        <div className="grid grid-cols-3 gap-6">

                          {/* Shipping */}
                          <div>
                            <h4 className="font-bold text-black mb-2">
                              📦 Shipping Address
                            </h4>

                            {order.address ? (
                              <>
                                <p>{order.address.name}</p>
                                <p>{order.address.mobile}</p>
                                <p>{order.address.address}</p>
                                <p>
                                  {order.address.city} - {order.address.pincode}
                                </p>
                              </>
                            ) : (
                              <p className="text-red-500">
                                Address Not Available
                              </p>
                            )}
                          </div>

                          {/* Payment */}
                          <div>
                            <h4 className="font-bold mb-2">
                              💳 Payment Details
                            </h4>

                            <p>
                              Type: {order.payment_type}
                            </p>

                            <p>
                              Status: {order.payment_status}
                            </p>

                            <p>
                              Amount: ₹{order.total_amount}
                            </p>
                          </div>

                          {/* Customer */}
                          <div>
                            <h4 className="font-bold mb-2">
                              👤 Customer Details
                            </h4>

                            <p>{order.customer.name}</p>

                            <p>{order.customer.mobile}</p>

                            <p className="break-all">
                              {order.customer.email}
                            </p>
                          </div>

                        </div>

                      </td>

                    </tr>

                  </React.Fragment>
                ))
              )}

          </tbody>

        </table>

      </div>

    </div>

  )
}