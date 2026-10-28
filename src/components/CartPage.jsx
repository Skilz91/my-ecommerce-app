import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function CartPage() {
  // Extract your shared context state values along with the new adjuster trigger
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  // 🔢 Quantity Update: Multiplies item base price by its tracked quantity row count
  const grandTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-gray-900">Your Shopping Basket</h1>
        <Link to="/" className="text-sm font-bold text-blue-600 hover:underline">
          ← Continue Browsing
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="text-center bg-white border border-gray-200 rounded-xl p-12 shadow-sm">
          <p className="text-gray-500 font-medium text-lg">Your cart is entirely empty.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm hover:bg-blue-700 transition">
            Shop Our Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 shadow-sm overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-contain bg-gray-50 p-1 rounded" />
                  <div className="min-w-0 max-w-50 sm:max-w-xs">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm font-black text-blue-600 mt-0.5">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* 🔢 Interactive Quantity Toggle Elements Container */}
                <div className="flex items-center gap-6 justify-between sm:justify-end flex-1 sm:flex-none">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                    {/* Minus Button */}
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded-md transition cursor-pointer text-sm"
                    >
                      -
                    </button>
                    {/* Display Field */}
                    <span className="w-9 text-center text-xs font-bold text-gray-800">
                      {item.quantity || 1}
                    </span>
                    {/* Plus Button */}
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded-md transition cursor-pointer text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Subtotal Summary</p>
              <h2 className="text-3xl font-black text-gray-900 mt-0.5">${grandTotal.toFixed(2)}</h2>
            </div>
            
            {/* 🔗 FIXED: Converted static button to active Link path routing layout */}
            <Link 
              to="/checkout" 
              className="bg-green-600 hover:bg-green-700 text-white font-black py-3 px-8 rounded-xl transition shadow-md cursor-pointer text-center text-sm block sm:inline-block"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
