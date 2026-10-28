import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  }

  return (
    <div className="p-6 max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl shadow-md mt-16">
      <h2 className="text-xl font-black text-gray-900 text-center mb-4">Create Account</h2>
      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm text-center font-bold">
          ✓ Registered! Moving to Login...
        </div>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-2.5 rounded-xl transition text-sm cursor-pointer shadow-sm">
            Sign Up
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            Already have an account? <Link to="/signin" className="text-blue-600 font-bold hover:underline">Sign in</Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default RegisterPage;
