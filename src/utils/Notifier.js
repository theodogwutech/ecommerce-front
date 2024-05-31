import { toast, Bounce } from "react-toastify";

const Notifier = ({ type, message }) => {
    toast[type](message, {
        autoClose: 5000,
        className: "text-sm",
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "top-right",
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};

export default Notifier;
