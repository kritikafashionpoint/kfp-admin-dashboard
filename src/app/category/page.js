'use client'
import React, { useEffect, useState } from 'react'
import { gold } from '../color/color'
import AddCategory from './comps/AddCategory'
import ViewCategory from './comps/ViewCategory'
import { get_api } from '../api_helper/api_helper'
import Loading from '../../../Loading'

export default function Page() {

    const [activeTab, setActiveTab] = useState('add-category')

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editId, setEditId] = useState(null)

    // FETCH ALL CATEGORIES
    const fetchAllCategories = async () => {

        try {

            setLoading(true);

            const response = await get_api({
                params: null,
                path: "admin/category/view-categories"
            });

            if (response.data.success) {
                setCategories([...response.data.data]);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <div className='lg:p-10 p-5 h-full bg-black text-white overflow-y-scroll custom-scrollbar scroll-smooth'>


            {loading && <Loading />}

            {/* Buttons */}
            <div className='flex sm:flex-row flex-col gap-4 mb-8'>

                <span
                    type='button'
                    onClick={() => setActiveTab('add-category')}
                    className={`
        px-6 py-3 rounded-2xl font-semibold duration-300
        cursor-pointer
        border tracking-wide
        ${activeTab === 'add-category'
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
                        activeTab === 'add-category'
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
                    Add Category
                </span>

                <span
                    onClick={() => {
                        fetchAllCategories()
                        setActiveTab('view-category')
                    }}
                    className={` relative
        px-6 py-3 rounded-2xl font-semibold duration-300
        cursor-pointer
        border tracking-wide
        ${activeTab === 'view-category'
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
                        activeTab === 'view-category'
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
                    <p className='absolute animate-pulse -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-amber-300 text-black rounded-full'>{categories?.length}</p>
                    View Category
                </span>

            </div>

            {/* components */}
            {activeTab === 'add-category' && <AddCategory
                loading={loading}
                setLoading={setLoading}
                editId={editId}
                setEditId={setEditId}
            />}
            {activeTab === 'view-category' && <ViewCategory
                fetchAllCategories={fetchAllCategories}
                setActiveTab={setActiveTab}
                loading={loading}
                setLoading={setLoading}
                categories={categories}
                setCategories={setCategories}
                editId={editId}
                setEditId={setEditId}
            />}

        </div>
    )
}