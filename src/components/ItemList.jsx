import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getOrderItems } from "../services/api";
import capitalizeWordsExceptOneLetter from "../utils/CapitalizeWords";
import SimpleLoader from "./blocks/SimpleLoader";

function ItemList() {
    const [items, setItems] = useState([]);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const loadItems = useCallback(async () => {
        const response = await getOrderItems({ limit, offset });
        setItems(response.data.data);
        setTotal(response.data.total);
    }, [limit, offset]);

    useEffect(() => {
        loadItems();
    }, [loadItems, offset]);

    const handleNext = () => {
        if (offset + limit < total) {
            setOffset(offset + limit);
        }
    };

    const handlePrevious = () => {
        if (offset - limit >= 0) {
            setOffset(offset - limit);
        }
    };

    if (items.length === 0) {
        return <SimpleLoader />;
    }

    return (
        <div className="max-w-[1000px] mx-auto py-20 px-10">
            <h1 className="text-[#0B5999] text-2xl text-center font-bold mb-10">
                Order Items
            </h1>
            <ul className="flex items-center flex-wrap justify-evenly gap-6">
                {items.map((item, index) => (
                    <Link
                        to={`/item/${item.product_id}/${item.id}`}
                        className="hover:bg-[#0B5999] hover:text-white duration-300 transition-all shadow-md rounded-lg w-full sm:w-60 h-24 px-4 py-6"
                        key={Number(index)}
                    >
                        <p className="!items-center">
                            {capitalizeWordsExceptOneLetter(
                                item.product_category
                            )}
                        </p>
                    </Link>
                ))}
            </ul>
            <div className="mt-10 flex items-center gap-20 justify-center">
                <button
                    className="border h-[40px] w-[140px] cursor-pointer border-[#0B5999] hover:bg-[#0B5999] bg-white rounded-md px-6 py-[6px] text-[13px] text-[#0B5999] hover:text-white duration-300 transition-all shadow-md"
                    onClick={handlePrevious}
                    disabled={offset === 0}
                >
                    Previous
                </button>
                <button
                    className="border border-[#0B5999] h-[40px] w-[140px] cursor-pointer hover:bg-[#0B5999] bg-white rounded-md px-6 py-[6px] text-xs text-[#0B5999] hover:text-white duration-300 transition-all shadow-md"
                    onClick={handleNext}
                    disabled={offset + limit >= total}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ItemList;
