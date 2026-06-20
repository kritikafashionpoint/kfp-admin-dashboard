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
      console.log(response.data)


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

              <th className="p-3 text-left">O-ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment Type</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {orders
              .filter(order => order.payment_status === 'paid')
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((order) => (

                order.items.map((item) => (

                  <tr
                    key={item.order_item_id}
                    className="border-b hover:bg-amber-200 transition"
                  >

                    <td className="p-3 font-semibold text-center">
                      #{order.order_id}
                    </td>

                    <td className="p-3">
                      <div>
                        <p className="font-semibold capitalize">
                          {order.customer.name}
                        </p>


                      </div>
                    </td>

                    <td className="p-3">
                      <div>
                        <p>{order.customer.mobile}</p>
                        <p className="text-xs text-gray-500">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-3">
                      <div>
                        <p className="font-semibold">
                          {item.product_title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.p_short_description}
                        </p>
                      </div>
                    </td>

                    <td className="p-3">

                      <img
                        onClick={() => openImage(item.product_image)}
                        src={item.product_image}
                        alt={item.product_title}
                        className="w-16 h-16 cursor-pointer rounded-lg object-cover border"
                      />

                    </td>



                    <td className="p-3">
                      {item.quantity}
                    </td>

                    <td className="p-3 font-bold text-yellow-600">
                      ₹{item.price}
                    </td>

                    <td className="p-3 capitalize">
                      {order.payment_type}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-md
                                    ${order.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          } `}
                      >
                        {order.payment_status}
                      </span>

                    </td>

                    <td className="p-3">

                      <p
                        className={`px-3 py-1 rounded-md font-semibold
                          ${order.order_status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : order.order_status === "out_for_delivery"
                              ? "bg-green-100 text-green-700"
                              : order.order_status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }
  `}
                      >
                        {order.order_status === "out_for_delivery"
                          ? "✅ Out For Delivery"
                          : order.order_status === "confirmed"
                            ? "📦 Confirmed"
                            : order.order_status === "cancelled"
                              ? "❌ Cancelled"
                              : order.order_status}
                      </p>

                    </td>

                    <td className="p-3 text-sm">
                      {new Date(order.created_at).toLocaleString()}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2 justify-center">

                        {order.order_status === "out_for_delivery" ? (
                          <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
                            ✅ Out For Delivery
                          </span>
                        ) : (
                          <button
                            onClick={() => handleOutForDelivery(order.order_id)}
                            className="px-4 py-2 rounded-lg bg-linear-to-r from-green-800 to-green-600 text-white text-sm font-semibold hover:scale-105 transition cursor-pointer"
                          >
                            🚚 Out For Delivery
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>

                ))

              ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}