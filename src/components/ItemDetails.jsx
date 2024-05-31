import React, { useState, useEffect, useCallback } from "react";

import "react-toastify/dist/ReactToastify.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderItem, deleteOrderItem, getOrderItems } from "../services/api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa6";
import capitalizeWordsExceptOneLetter from "../utils/CapitalizeWords";
import SimpleLoader from "./blocks/SimpleLoader";
import Notifier from "../utils/Notifier";

function ItemDetails() {
    const { id, product_id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    const loadItem = useCallback(async () => {
        try {
            const response = await getOrderItem(product_id, id);
            setItem(response.data);
        } catch (error) {
            console.error("Error fetching item:", error);
        } finally {
            setIsLoading(false);
        }
    }, [product_id, id]);

    useEffect(() => {
        loadItem();
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [loadItem]);

    const handleDelete = async () => {
        try {
            setIsLoadingButton(true);
            const response = await deleteOrderItem(product_id, id);
            Notifier({
                type: "success",
                message: response.data.message,
            });
            setIsLoadingButton(false);
            navigate("/");
            await getOrderItems({ limit: 20, offset: 0 });
        } catch (error) {
            setIsLoadingButton(false);
            Notifier({
                type: "error",
                message: error.response.data.message,
            });
        }
    };

    if (isLoading) {
        return <SimpleLoader />;
    }

    if (!item) {
        return (
            <div className="max-w-[1000px] h-screen mx-auto py-20 px-10 text-lg flex flex-col text-[#C10000] justify-center items-center">
                Item not found
                <button
                    className="flex items-center mt-7 border h-[44px] w-[180px] cursor-pointer bg-[#0B5999] hover:bg-[#194f7a] text-white rounded-md px-6 py-[6px] text-[13px] hover:text-white duration-300 transition-all shadow-md"
                    onClick={() => navigate(-1)}
                >
                    <AiOutlineArrowLeft
                        size={14}
                        className="text-[#FFFFFF] mr-6"
                    />
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto py-20 sm:px-10 bg-[#fcfcfc]">
            <div className="flex gap-7 flex-col mx-auto bg-white w-full px-4 sm:px-10 py-14 lg:w-[70%] relative">
                <h1 className="text-[#0B5999] text-2xl text-center font-bold mb-10">
                    Item Details
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex justify-center items-center bg-gray-50 hover:bg-gray-100 rounded-md cursor-pointer duration-300 transition-all shadow-md"
                >
                    <AiOutlineArrowLeft size={14} className="text-[#0B5999]" />
                </button>
                <div className="flex items-center justify-between border border-x-0 border-t-0 py-3 border-[#f1f0f0]">
                    <p className="text-lg text-[#0B5999] font-semibold">
                        Product Category:{" "}
                    </p>
                    <p>
                        {capitalizeWordsExceptOneLetter(item.product_category)}
                    </p>
                </div>
                <div className="flex items-center justify-between border border-x-0 border-t-0 py-3 border-[#f1f0f0]">
                    <p className="text-lg text-[#0B5999] font-semibold">
                        Price:{" "}
                    </p>
                    <p className="text-green-500">
                        {item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>
                </div>
                <div className="flex items-center justify-between border border-x-0 border-t-0 py-3 border-[#f1f0f0]">
                    <p className="text-lg text-[#0B5999] font-semibold">
                        Shipping Limit Date:{" "}
                    </p>
                    <p>{item.date}</p>
                </div>
                <div className="mt-10 flex items-center gap-20 justify-center">
                    <button
                        className="flex items-center justify-center border h-[40px] w-[140px] cursor-pointer border-[#C10000]] hover:bg-[#C10000] bg-white rounded-md px-6 py-[6px] text-[13px] text-[#C10000] hover:text-white duration-300 transition-all shadow-md"
                        onClick={handleDelete}
                    >
                        {isLoadingButton && (
                            <FaSpinner
                                size={14}
                                className="animate-spin mr-4"
                            />
                        )}
                        Delete
                    </button>
                    <Link
                        className="flex items-center justify-center border border-[#0B5999] h-[40px] w-[140px] cursor-pointer hover:bg-[#0B5999] bg-white rounded-md px-6 py-[6px] text-xs text-[#0B5999] hover:text-white duration-300 transition-all shadow-md"
                        to={`/item/${product_id}/${id}/edit`}
                    >
                        Edit
                    </Link>{" "}
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;
