import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function CheckoutPage() {
  const { cart } = useCart();
  
  // Calculate final costs matching your CartPage multiplication row architecture
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const grandTotal = subtotal + shipping;

  // Local state parameters for form management tracking fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Simulate successful order commitment execution lifecycle
    setOrderPlaced(true);
  }

  // 🎉 Success Screen Block View State
  if (orderPlaced) {
    return (
      <div className="p-6 max-w-md mx-auto text-center mt-12 bg-white border border-gray-200 rounded-2xl shadow-md ">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
          ✓
        </div>
        <h2 className="text-2xl font-black text-gray-900">Order Confirmed!</h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Thank you for your purchase, <span className="font-bold text-gray-800">{formData.fullName}</span>. 
          We have sent a digital copy invoice tracker receipt to <span className="font-semibold text-gray-700">{formData.email}</span>.
        </p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition">
          Return to Storefront Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="md:col-span-5 flex justify-between items-center mb-2">
        <h1 className="text-2xl font-black text-gray-900">Secure Checkout</h1>
        <Link to="/cart" className="text-sm font-bold text-blue-600 hover:underline">
          ← Back to Basket
        </Link>
      </div>

      {/* Left Columns: Customer Shipping Information Input Panel Form */}
      <form onSubmit={handleSubmit} className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-100 pb-2">1. Delivery Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="Jane Doe" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="jane@example.com" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Street Address</label>
            <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="123 Main St" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">City</label>
            <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="New York" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">ZIP Code</label>
            <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="10001" />
          </div>
        </div>

        <h2 className="text-md font-bold text-gray-800 border-b border-gray-100 pb-2 pt-2">2. Payment Methods</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Card Number</label>
            <input type="text" name="cardNumber" required maxLength="16" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="4111 2222 3333 4444" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Expiry Date</label>
              <input type="text" name="expiry" required placeholder="MM/YY" maxLength="5" value={formData.expiry} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">CVV Code</label>
              <input type="password" name="cvv" required placeholder="123" maxLength="3" value={formData.cvv} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={cart.length === 0} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition shadow-md cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed text-center text-sm">
          Place Secure Order (\${grandTotal.toFixed(2)})
        </button>
      </form>

      {/* Right Columns: Dynamic Summary Invoice Panel View */}
      <div className="md:col-span-2 space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-50 pb-2">Order Breakdown</h2>
          
          {cart.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4 font-medium">No items present.</p>
          ) : (
            <div className="max-h-48 overflow-y-auto divide-y divide-gray-50 pr-1 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="py-2 flex justify-between items-center text-xs gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-800 truncate">{item.title}</p>
                    <p className="text-gray-400 mt-0.5">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-black text-gray-900">\${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="font-bold text-gray-800">\${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping cost:</span>
              <span className="font-bold text-gray-800">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-50 text-gray-900 font-black">
              <span>Grand Total:</span>
              <span className="text-blue-600">\${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
