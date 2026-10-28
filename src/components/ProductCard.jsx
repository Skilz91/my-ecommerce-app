import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; // 📜 Hook directly into our shared Milestone 3 context database

// 🔔 Clean up step: Removed the manual onAddToCart middleman prop parameter
function ProductCard({ product }) {

  //  Turn on your walkie-talkie to extract the shared global addToCart action directly!
  const { addToCart } = useCart();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300">
      
      {/* This Link wraps the item details so it changes the URL when clicked! */}
      
      <Link to={`/product/${product.id}`} className="w-full flex flex-col items-center group cursor-pointer">
        <div className="w-32 h-32 flex items-center justify-center overflow-hidden mb-4 bg-gray-50 rounded-md p-2">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        <h3 className="text-sm font-bold text-gray-800 text-center line-clamp-2 h-10 min-h-10 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 mt-2 text-center line-clamp-2 min-h-10">
          {product.description}
        </p>
      </Link>

      <div className="w-full mt-4">
        <p className="text-lg font-extrabold text-blue-600 text-center">\${product.price.toFixed(2)}</p>

        <button
          onClick={() => addToCart(product)} // ✅ FIXED: Triggers your global context state directly!
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full font-semibold transition-colors duration-200 cursor-pointer text-sm shadow-sm"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
