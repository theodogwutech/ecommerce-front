import { ImSpinner10 } from "react-icons/im";

export default function SimpleLoader() {
    return (
        <div className="max-w-[1000px] h-screen mx-auto py-20 px-10 flex justify-center items-center">
            <ImSpinner10 size={50} className="text-[#0B5999] animate-spin" />
        </div>
    );
}
