import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await api.register(name, email, password);
      if (data.message === "Registered successfully") {
        navigate("/login");
      } else {
        setError(data.detail || "Registration failed");
      }
    } catch (err) {
      setError("Cannot connect to server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center
                    justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md
                      w-full max-w-md">
        <h2 className="text-2xl font-bold text-center
                       text-gray-800 mb-6">
          Create Account
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg
                       px-4 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg
                       px-4 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg
                       px-4 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-green-600 text-white py-2
                       rounded-lg hover:bg-green-700
                       font-semibold disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login"
               className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}