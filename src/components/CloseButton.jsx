import { FaTimes } from "react-icons/fa";

export default function CloseButton( {className = "", ...props} ) {
    return (
        <button {...props} type="button" className={"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" + className}>
            <FaTimes className="w-3 h-3" />
        </button>
    );
}