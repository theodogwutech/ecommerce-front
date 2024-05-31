import React, { useState } from "react";
import { updateAccount } from "../services/api";

function Account() {
    const [sellerCity, setSellerCity] = useState("");
    const [sellerState, setSellerState] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { seller_city: sellerCity, seller_state: sellerState };
        await updateAccount(data);
    };

    return (
        <div>
            <h1>Update Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        value={sellerCity}
                        onChange={(e) => setSellerCity(e.target.value)}
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        value={sellerState}
                        onChange={(e) => setSellerState(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Account;
