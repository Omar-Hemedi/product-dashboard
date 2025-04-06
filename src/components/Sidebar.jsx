import { NavLink } from "react-router-dom";
import { FaBox, FaHistory, FaTags, FaWarehouse, FaEnvelope, FaCog } from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  const menu = [
    { name: "Products", icon: <FaBox />, path: "/products" },
    { name: "Order History", icon: <FaHistory />, path: "/order-history" },
    { name: "Offers", icon: <FaTags />, path: "/offers" },
    { name: "Stock", icon: <FaWarehouse />, path: "/stock" },
    { name: "Message", icon: <FaEnvelope />, path: "/message" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 bg-white h-screen p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:block`}
      >
        <h1 className="text-2xl font-bold mb-6 p-6">Exactconnect</h1>
        <ul className="space-y-4">
          {menu.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                    isActive ? "bg-red-50 text-red-500 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span>Busy Mode</span>
          <div className="w-10 h-5 rounded-full bg-black relative">
            <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}