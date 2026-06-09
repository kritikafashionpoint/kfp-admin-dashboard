'use client'
import React, { useState } from 'react'
import Loading from '../../../Loading'
import Swal from 'sweetalert2'
import { post_api } from '../api_helper/api_helper'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { gold } from '../color/color'
import Link from 'next/link'

export default function ForgotPassword() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [adminEmail, setAdminEmail] = useState('')
    const [otpValue, setOtpValue] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [emailVerified, setEmailVerified] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)


    const sendOtp = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {

            const response = await post_api({
                body: { admin_email: adminEmail },
                params: null,
                path: 'admin/auth/send-otp-to-forgot'
            })

            if (response.data.success) {
                setEmailVerified(true)

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.msg,
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                })

            }

        } catch (error) {
            if (error.response) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    text: error.response.data.msg || 'You Entered a wrong Email !',
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                })

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Please try again later',
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                })

            }

        } finally {
            setLoading(false)
        }
    }

    const verifyOtpValue = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {

            const response = await post_api({
                body: { admin_email: adminEmail, otp: otpValue },
                params: null,
                path: 'admin/auth/verify-otp-by-email'
            })

            if (response.data.success) {
                setOtpVerified(true)

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.msg,
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                })
            }
        }
        catch (error) {
            if (error.response) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    text: error.response.data.msg || 'Invalid Otp !',
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                })

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Please try again later',
                    confirmButtonColor: '#00B0D3'
                })

            }

        } finally {
            setLoading(false)
        }
    }

    const createNewPassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await post_api({
                body: {
                    new_password: e.target.new_password.value,
                    admin_email: adminEmail
                },
                params: null,
                path: 'admin/auth/create-new-password'
            })

            // 200 OK
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.msg,
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                }).then((res) => {
                    if (res.isConfirmed) {
                        router.push('/')
                    }
                })
            }

        } catch (error) {
            if (error.response) {
                // 404: Cannot change password
                if (error.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cannot Create Password Now',
                        text: 'Please try again later',
                        background: '#000',
                        color: '#fff',
                        confirmButtonColor: '#E6C766'
                    })
                }
                // 500: Server Error
                else if (error.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Please try again later',
                        background: '#000',
                        color: '#fff',
                        confirmButtonColor: '#E6C766'
                    })
                }
            } else {
                // Network or other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Please check your connection',
                    background: '#000',
                    color: '#fff',
                    confirmButtonColor: '#E6C766'
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='relative h-screen overflow-hidden w-full flex items-center justify-center bg-black md:px-4'>
            {loading && <Loading />}
            <div className=" ">

                {/* Shine */}
                <div
                    className="
        absolute
        w-105
        h-105
        rounded-full
        -top-40
        -left-40
        opacity-30
        blur-[120px]
        animate-pulse
        pointer-events-none
    "
                    style={{
                        background: `
            radial-gradient(
                circle,
                ${gold.light} 0%,
                ${gold.base}40 35%,
                transparent 75%
            )
        `,
                        boxShadow: `
            0 0 120px ${gold.base},
            0 0 220px ${gold.light}
        `
                    }}
                ></div>

                <div
                    className="
        absolute
        w-105
        h-105
        rounded-full
        -bottom-40
        -right-40
        opacity-30
        blur-[120px]
        animate-pulse
        pointer-events-none
    "
                    style={{
                        background: `
            radial-gradient(
                circle,
                ${gold.light} 0%,
                ${gold.base}40 35%,
                transparent 75%
            )
        `,
                        boxShadow: `
            0 0 120px ${gold.base},
            0 0 220px ${gold.light}
        `
                    }}
                ></div>


                <div className="w-full  max-w-lg bg-black md:border border-amber-400 rounded-xl p-8 shadow-xl">

                    {/* Title */}
                    <h2 style={{ color: gold.base }} className="text-3xl font-bold  text-center mb-2">
                        Forgot Password
                    </h2>

                    <p className="text-white text-center mb-8">
                        Enter your email and verify OTP to reset password
                    </p>

                    {/* Email Field */}
                    <div className="sm:mb-6 mb-3">
                        <label className="text-sm text-white block mb-2">
                            Admin Email

                        </label>

                        <form onSubmit={sendOtp} className="flex sm:flex-row flex-col sm:gap-3 gap-2">
                            <input
                                type="email"
                                onChange={(e) => setAdminEmail(e.target.value)}
                                name='admin_email'
                                placeholder="Enter your email"
                                className="flex-1 ] border tracking-widest text-lg border-white rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                            />
                            <div className='flex items-center '>

                                {emailVerified ? (
                                    <CheckCircle size={28} className="text-amber-300" />
                                )
                                    :
                                    <button style={{ background: gold.mid }} className="w-full cursor-pointer hover:scale-105 duration-300 px-4 md:py-4 py-3 rounded-2xl font-semibold transition">
                                        Send OTP
                                    </button>
                                }

                            </div>
                        </form>
                    </div>

                    {/* OTP Field */}
                    <div className="sm:mb-6 mb-3">
                        <label className="text-sm text-white block mb-2">
                            OTP
                        </label>

                        <form onSubmit={verifyOtpValue} className="flex sm:flex-row flex-col sm:gap-3 gap-2">
                            <input
                                disabled={!emailVerified}
                                onChange={(e) => setOtpValue(e.target.value)}
                                name='otp'
                                type="text"
                                placeholder="Enter OTP"
                                className="flex-1 ] border tracking-widest text-lg border-white rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                            />

                            {otpVerified ?
                                <CheckCircle size={28} className="text-amber-300" />
                                :
                                <button type='submit' className="border cursor-pointer border-amber-300 text-amber-300 hover:bg-[#D4AF37] duration-300 hover:border-transparent hover:text-black px-4 py-3 rounded-2xl font-semibold transition">
                                    Verify OTP
                                </button>

                            }
                        </form>
                    </div>

                    {/* OTP Field */}
                    <div className="sm:mb-6 mb-3">
                        <label className="text-sm text-white block mb-2">
                            NEW PASSWORD
                        </label>

                        <form onSubmit={createNewPassword} className="flex sm:flex-row flex-col sm:gap-3 gap-2">
                            <input
                                name='new_password'
                                disabled={!otpVerified}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="text"
                                placeholder="Create New Password"
                                className="flex-1 ] border tracking-widest text-lg border-white rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                            />

                            <button type='submit' className="border cursor-pointer border-amber-300 text-amber-300 hover:bg-[#D4AF37] duration-300 hover:border-transparent hover:text-black px-4 py-3 rounded-2xl font-semibold transition">
                                Create
                            </button>
                        </form>
                    </div>

                    {/* Back to login */}
                    <p className="text-center text-white text-md mt-4">
                        Remember your password?
                        <Link href={'/'}><span style={{ color: gold.light }} className="cursor-pointer ml-2 text-lg hover:underline">
                            Login Here
                        </span></Link>
                    </p>

                </div>

            </div>
        </div>
    )
}