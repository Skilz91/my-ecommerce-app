import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function Header() {
  const { cart } = useCart();
  // ☰ local state toggler tracking sidebar menu view window
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Main Top Header Area */}
      <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center w-full border-b-4 border-red-600">
        <div className="flex items-center gap-4">
          {/* ☰ Amazon-inspired 3-lines menu switch icon */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="hover:bg-blue-800 p-2 rounded-lg transition duration-200 cursor-pointer flex flex-col gap-1 w-9 h-9 justify-center items-center border border-blue-600"
          >
            <span className="w-5 h-0.5 bg-white rounded"></span>
            <span className="w-5 h-0.5 bg-white rounded"></span>
            <span className="w-5 h-0.5 bg-white rounded"></span>
          </button>

          <Link to="/" className="text-xl font-extrabold tracking-tight hover:text-red-400 transition ml-2">
            🛒 My E-Commerce Store
          </Link>
        </div>
        
        {/* Right Nav Account Links Panel */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 border-r border-blue-600 pr-4">
            <Link to="/signin" className="text-xs font-bold text-gray-100 hover:text-white transition px-2 py-1">
              Sign In
            </Link>
            <Link to="/register" className="text-xs font-bold bg-white text-blue-700 hover:bg-red-600 hover:text-white transition px-3 py-1.5 rounded-md font-black shadow-sm">
              Sign Up
            </Link>
          </div>

          <Link to="/cart" className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-md cursor-pointer">
            <span className="text-sm font-bold text-white">Cart:</span>
            <span className="bg-white text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-black animate-pulse">
              {cart.length}
            </span>
          </Link>
        </div>
      </header>

      {/* 🚀 Amazon Left Side Slide-out Drawer Panel Markup */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex animate-fadeIn">
          {/* Dark overlay backdrop click screen wrapper */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Drawer Slate Body UI Layout */}
          <div className="relative w-72 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 transform translate-x-0">
            {/* Header profile title block card */}
            <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
              <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center font-bold text-xs">👤</div>
              <h3 className="font-black text-sm">Hello, Sign In</h3>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-4 text-white text-xl font-bold hover:text-red-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrolling Menu Choices Category Lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h4 className="text-xs uppercase font-black text-gray-400 tracking-wider mb-2">Shop Categories</h4>
                <ul className="space-y-1 text-sm font-bold text-gray-700">
                  <li><Link to="/" onClick={() => setIsSidebarOpen(false)} className="block p-2 hover:bg-gray-100 rounded-md transition">💻 Electronics</Link></li>
                  <li><Link to="/" onClick={() => setIsSidebarOpen(false)} className="block p-2 hover:bg-gray-100 rounded-md transition">👕 Men's Clothing</Link></li>
                  <li><Link to="/" onClick={() => setIsSidebarOpen(false)} className="block p-2 hover:bg-gray-100 rounded-md transition">👗 Women's Clothing</Link></li>
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs uppercase font-black text-gray-400 tracking-wider mb-2">Help & Settings</h4>
                <ul className="space-y-1 text-sm font-semibold text-gray-600">
                  <li><Link to="/signin" onClick={() => setIsSidebarOpen(false)} className="block p-2 hover:bg-gray-100 rounded-md transition">Your Account</Link></li>
                  <li><Link to="/" onClick={() => setIsSidebarOpen(false)} className="block p-2 hover:bg-gray-100 rounded-md transition">Customer Support</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
