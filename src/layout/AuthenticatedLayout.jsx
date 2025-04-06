import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AuthenticatedLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
    className={`grid min-h-screen transition-[grid-template-columns] duration-300 ease-in-out bg-gray-100 dark:bg-gray-900 ${
    isOpen ? "md:grid-cols-sidebar-collapsed" : "md:grid-cols-sidebar"
    }`}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="bg-white w-full overflow-auto h-screen">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-4 md:ml-64">{children}</div>
      </main>
    </div>
  );
}