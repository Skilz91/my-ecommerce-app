import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔍 Feature 1 & 2: Lesson Required State Variables
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const backupProducts = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack (Local)",
      price: 109.95,
      description: "Your perfect pack for everyday use.",
      image: "https://unsplash.com",
      category: "men's clothing"
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts (Local)",
      price: 22.30,
      description: "Slim-fitting style, breathable fabric.",
      image: "https://unsplash.com",
      category: "men's clothing"
    },
    {
      id: 3,
      title: "Mens Cotton Jacket (Local)",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter.",
      image: "https://unsplash.com",
      category: "men's clothing"
    }
  ];

  // Open src/components/Main.jsx and find your useEffect block. 
  // Change ONLY the fetchProducts function to this safe dual-link setup:
  useEffect(() => {
    async function fetchProducts() {
      try {
        setError(null);
        setLoading(true);
        
        // Try the primary endpoint first
        let response = await fetch("https://fakestoreapi.com/products");
        
        // If primary endpoint blocks or returns an error, try the secondary mirrored mirror link
        if (!response.ok) {
          response = await fetch("https://onrender.com");
        }
        
        if (!response.ok) {
          throw new Error("Failed to load products from all network sources");
        }
        
        const data = await response.json();
        // Handle array payload wrappers if the alternative api wraps data in an object
        setProducts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Network integration error:", err);
        setError("Error loading products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // 🔍 Feature 1: Lesson Required Input Event Handler
  function handleSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  // 🔍 Feature 2: Lesson Required Dropdown Event Handler
  function handleFilterChange(event) {
    setSelectedCategory(event.target.value);
  }

  // 🎛️ Combining Search and Filters: Lesson Required Filtering Logic Matrix
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      {/* 🚀 Amazon-Inspired Promotional Deal Banner Layout Section */}
      <section className="max-w-4xl mx-auto mb-8 relative rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-blue-900 to-indigo-950 text-white min-h-40 flex items-center p-6 border-b-4 border-red-600">
        {/* Background placeholder aesthetic image overlay from Unsplash */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center" 
          style={{ backgroundImage: "url('https://unsplash.com')" }}
        ></div>
        
        {/* Foreground Content Card Layout */}
        <div className="relative z-10 max-w-lg space-y-2">
          <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md animate-pulse">
            LIMITED TIME OFFER
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            Get <span className="text-yellow-400">15% OFF</span> Everything!
          </h2>
          <p className="text-xs md:text-sm font-semibold text-gray-200">
            Use code <span className="bg-white/20 px-2 py-0.5 rounded font-black text-white select-all border border-white/20">SAVE15</span> at checkout to instantly trim down your cart grand total.
          </p>
        </div>

        {/* Right side floating accent background text vector */}
        <div className="hidden md:flex absolute right-8 bottom-0 top-0 items-center justify-center text-6xl opacity-20 font-black tracking-tighter select-none">
          SALE
        </div>
      </section>

      {/* Welcome Section */}
      <section className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-blue-700">Welcome to Our Live Store!</h2>
        <p className="mt-4 text-gray-600">Clean architecture using live data streams.</p>
      </section>

      {/* 🛠️ Modern Navigation Bar Interface Controls Container */}
      {!loading && !error && (
        <section className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          {/* Search Input Bar Field */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-2/3 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
          />

          {/* Category Selector Dropdown Menu */}
          <select 
            value={selectedCategory} 
            onChange={handleFilterChange}
            className="w-full sm:w-1/3 px-3 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm text-gray-700 cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </section>
      )}

      {/* 1. Loading UI */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-medium text-gray-600 animate-pulse">
            Loading products from API...
          </p>
        </div>
      )}

      {/* 2. Error Fallback UI */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto text-center mb-8">
          <p className="text-red-700 font-medium mb-3">⚠️ {error}</p>
          <button 
            onClick={() => { setProducts(backupProducts); setError(null); }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors shadow-sm text-sm"
          >
            Load Backup Offline Products
          </button>
        </div>
      )}

      {/* 3. Render Filtered Products Grid */}
      {!loading && filteredProducts.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      {/* 4. Empty Search/Filter State Helper */}
      {!loading && filteredProducts.length === 0 && products.length > 0 && (
        <div className="text-center p-12 bg-white rounded-xl max-w-md mx-auto shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">No products match your active search filter criteria.</p>
          <button 
            onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}
            className="mt-4 text-xs font-bold text-blue-600 hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </main>
  );
}

export default Main;
