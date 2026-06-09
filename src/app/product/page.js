'use client'
import React, { useEffect, useState } from 'react'
import { gold } from '../color/color'
import { get_api } from '../api_helper/api_helper'
import Loading from '../../../Loading'
import ViewProduct from './comps/Viewproduct'
import AddProduct from './comps/AddProduct'

export default function Page() {

    const [activeTab, setActiveTab] = useState('add-product')
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [editId, setEditId] = useState(null)

    const fetchAllCategories = async () => {

        try {

            setLoading(true);

            const response = await get_api({
                params: null,
                path: "admin/category/view-categories"
            });

            if (response.data.success) {
                setCategories(response.data.data);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const fetchAllProducts = async () => {

        try {

            setLoading(true);

            const response = await get_api({
                params: null,
                path: "admin/product/view-products"
            });

            if (response.data.success) {
                setProducts(response.data.data);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);


    return (
        <div className='lg:p-10 p-5 h-full bg-black text-white overflow-y-scroll custom-scrollbar scroll-smooth'>

            {loading && <Loading />}


            {/* Buttons */}
            <div className='flex sm:flex-row flex-col gap-4 mb-8'>

                <span
                    onClick={() => setActiveTab('add-product')}
                    className={`
        px-6 py-3 rounded-2xl font-semibold duration-300
        cursor-pointer
        border tracking-wide
        ${activeTab === 'add-product'
                            ? `
                text-black
                border-transparent
                shadow-[0_0_25px_rgba(0,0,0,0.4)]
              `
                            : `
                bg-black
                border
                hover:scale-105
              `
                        }
    `}
                    style={
                        activeTab === 'add-product'
                            ? {
                                background: `linear-gradient(to bottom right, ${gold.dark}, ${gold.base}, ${gold.dark})`,
                                color: '#000'
                            }
                            : {
                                borderColor: gold.base,
                                color: gold.base,
                                background: 'rgba(0,0,0,0.7)'
                            }
                    }
                >
                    Add Products
                </span>

                <span
                    onClick={() => {
                        setActiveTab('view-product')
                        fetchAllProducts()
                    }}
                    className={`relative
        px-6 py-3 rounded-2xl font-semibold duration-300
        cursor-pointer
        border tracking-wide
        ${activeTab === 'view-product'
                            ? `
                text-black
                border-transparent
                shadow-[0_0_25px_rgba(0,0,0,0.4)]
              `
                            : `
                bg-black
                border
                hover:scale-105
              `
                        }
    `}
                    style={
                        activeTab === 'view-product'
                            ? {
                                background: `linear-gradient(to bottom right, ${gold.dark}, ${gold.base}, ${gold.dark})`,
                                color: '#000'
                            }
                            : {
                                borderColor: gold.base,
                                color: gold.base,
                                background: 'rgba(0,0,0,0.7)'
                            }
                    }
                >
                    <p className='absolute animate-pulse -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-amber-300 text-black rounded-full'>{products?.length || 0}</p>
                    View Products
                </span>

            </div>

            {/* components */}
            {activeTab === 'add-product' && <AddProduct
                categories={categories}
                setCategories={setCategories}
                loading={loading}
                setLoading={setLoading}
                editId={editId}
                setEditId={setEditId}
            />}
            {activeTab === 'view-product' && <ViewProduct
                products={products}
                setProducts={setProducts}
                fetchAllProducts={fetchAllProducts}
                setActiveTab={setActiveTab}
                loading={loading}
                setLoading={setLoading}
                editId={editId}
                setEditId={setEditId}
            />}

        </div>
    )
}