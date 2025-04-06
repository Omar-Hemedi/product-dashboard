import { CiSearch } from "react-icons/ci";
export default function SearchInput({className="", placeholder=""}) {
    return (
        <form className={"" + className}>   
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <CiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input 
                    type="search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder={placeholder} required />
            </div>
        </form>
    );
}
