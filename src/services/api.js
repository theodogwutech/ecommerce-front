import axios from "axios";

const api = axios.create({
    baseURL: "https://ecommerce-task-4mni.onrender.com",
    auth: {
        username: "e49c26c3edfa46d227d5121a6b6e4d37",
        password: "55325",
    },
});

export const getOrderItems = (params) => api.get("/orderitems", { params });

export const getOrderItem = (product_id, id) =>
    api.get(`/orderitems/${product_id}/${id}`);

export const deleteOrderItem = (product_id, id) =>
    api.delete(`/orderitems/${product_id}/${id}`);

export const updateOrderItem = (product_id, id, data) =>
    api.put(`/orderitems/${product_id}/${id}`, data);

export const updateAccount = (data) => api.put("/account", data);
