import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Link } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage"; // 📜 Imported our new separate component file!
import SignInPage from "./components/SignInPage";
import RegisterPage from "./components/RegisterPage";
import { CartProvider, useCart } from "./components/CartContext";

// ========================================================
// 1. STATE MANAGEMENT & ROUTER ENGINE
// ========================================================
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Persistent top scoreboard navbar */}
          <Header />

          <Routes>
            {/* Main home catalog grid page */}
            <Route path="/" element={<Main />} />
            
            {/* Dynamic single item spec breakdown page */}
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Dynamic shopping cart review page */}
            <Route path="/cart" element={<CartPage />} />

            {/* 🆕 Secure checkout processing application page route */}
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* 🆕 Secure account sign in access gate route */}
            <Route path="/signin" element={<SignInPage />} />

            {/* 🆕 Customer registry account creation route */}
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

// ========================================================
// 2. DYNAMIC PRODUCT DETAILS COMPONENT
// ========================================================
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com{id}`);
        
        // Handle dual-link mirror failover layout if primary is down
        if (!res.ok) {
          const mirrorRes = await fetch(`https://onrender.com{id}`);
          if (!mirrorRes.ok) throw new Error("Failed to load product details from any source.");
          const mirrorData = await mirrorRes.json();
          setProduct(mirrorData);
        } else {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Detail integration error:", err);
        setError("Error loading product. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading item specs...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto text-center mt-8">
        <p className="text-red-700 font-medium mb-3">⚠️ {error || "Product not found"}</p>
        <Link to="/" className="text-sm font-bold text-blue-600 hover:underline">
          ← Return to Main Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image Panel */}
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
        <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
      </div>

      {/* Product Information Panel */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">
            {product.category}
          </span>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 mt-3">{product.title}</h1>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">{product.description}</p>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="text-3xl font-black text-blue-600">${product.price.toFixed(2)}</p>
          
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md cursor-pointer text-center text-sm"
            >
              ADD TO BASKET
            </button>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition text-center text-sm"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
