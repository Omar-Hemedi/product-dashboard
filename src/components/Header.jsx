import { BiBell } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaChevronDown, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import SearchInput from "./SearchInput";
import Toggle from "./Toggle";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header({ isOpen, setIsOpen }) {
  const { cartItemCount } = useCart();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap justify-between items-center p-4 bg-white md:ml-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-5 text-gray-500 bg-gray-100 p-2 rounded-md md:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="flex flex-col w-full gap-4 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="relative bg-gray-50 p-1.5 rounded-md">
            <BiBell size={21} className="text-gray-500" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>

          <Link
            to="/cart"
            className="relative bg-gray-50 p-1.5 rounded-md cursor-pointer"
          >
            <FaShoppingCart size={21} className="text-gray-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt="User"
                className="w-8 h-8 rounded-md"
              />
              <span className="text-sm font-medium">{userEmail || "Guest"}</span>
              <FaChevronDown className="text-gray-900" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        <div>
          <SearchInput className="w-full" placeholder="Search" />
        </div>

        <div>
          <Toggle label="Open For Order" />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-1/3">
          <SearchInput className="w-full" placeholder="Search" />
        </div>

        <div className="w-1/3 ml-5">
          <Toggle label="Open For Order" />
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="relative bg-gray-50 p-1.5 rounded-md">
            <BiBell size={21} className="text-gray-500" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>

          <Link
            to="/cart"
            className="relative bg-gray-50 p-1.5 rounded-md cursor-pointer"
          >
            <FaShoppingCart size={21} className="text-gray-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt="User"
                className="w-8 h-8 rounded-md"
              />
              <span className="text-sm font-medium">{userEmail || "Guest"}</span>
              <FaChevronDown className="text-gray-900" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
}