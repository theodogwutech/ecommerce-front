import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import { getOrderItem, updateOrderItem } from "../services/api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SimpleLoader from "./blocks/SimpleLoader";
import Notifier from "../utils/Notifier";

function EditItem() {
    const { id, product_id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({
        product_category: "",
        price: "",
        date: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const loadItem = useCallback(async () => {
        const response = await getOrderItem(product_id, id);
        setItem(response.data);
    }, [product_id, id]);

    useEffect(() => {
        loadItem();
    }, [loadItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const response = await updateOrderItem(product_id, id, item);

            navigate(`/item/${product_id}/${id}`);
            Notifier({
                type: "success",
                message: response.data.message,
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            Notifier({
                type: "error",
                message: error.response.data.message,
            });
        }
    };

    if (!item) {
        return <SimpleLoader />;
    }

    return (
        <div className="max-w-[1000px] mx-auto py-20 sm:px-10 bg-[#fcfcfc]">
            <div className="flex gap-7 flex-col mx-auto bg-white w-full px-4 sm:px-10 py-14 lg:w-[70%] relative">
                <h1 className="text-[#0B5999] text-2xl text-center font-bold mb-10">
                    Update Item
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex justify-center items-center bg-gray-50 hover:bg-gray-100 rounded-md cursor-pointer duration-300 transition-all shadow-md"
                >
                    <AiOutlineArrowLeft size={14} className="text-[#0B5999]" />
                </button>
                <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label
                            htmlFor="category"
                            className="text-sm text-[#0B5999] mb-2"
                        >
                            Product Category
                        </label>
                        <input
                            type="text"
                            name="product_category"
                            className="outline-none border w-full h-45 border-gray-300 rounded-md px-3 py-2"
                            value={item.product_category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="price"
                            className="text-sm text-[#0B5999] mb-2"
                        >
                            Price:
                        </label>
                        <input
                            type="number"
                            name="price"
                            className="outline-none border w-full h-45 border-gray-300 rounded-md px-3 py-2"
                            value={item.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="date"
                            className="text-sm text-[#0B5999] mb-2"
                        >
                            Shipping Limit Date:
                        </label>
                        <input
                            type="date"
                            name="date"
                            className="outline-none border w-full h-45 border-gray-300 rounded-md px-3 py-2"
                            value={
                                item.date
                                    ? new Date(item.date)
                                          .toISOString()
                                          .split("T")[0]
                                    : "Invalid date"
                            }
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="flex items-center justify-center text-base w-full border border-[#0B5999] h-[44px] cursor-pointer hover:bg-[#1a486e] bg-[#0B5999] rounded-md px-6 py-[6px] text-white duration-300 transition-all shadow-md"
                        type="submit"
                    >
                        {isLoading && (
                            <FaSpinner
                                size={14}
                                className="animate-spin mr-4"
                            />
                        )}
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditItem;
