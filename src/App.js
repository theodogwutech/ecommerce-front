import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemDetails from "./components/ItemDetails";
import EditItem from "./components/EditItem";
import Account from "./components/Account";
import "./index.css";

function App() {
    return (
        <Router>
            <div className="App">
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<ItemList />} />
                    <Route
                        path="/item/:product_id/:id"
                        element={<ItemDetails />}
                    />
                    <Route
                        path="/item/:product_id/:id/edit"
                        element={<EditItem />}
                    />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
