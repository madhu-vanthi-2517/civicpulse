import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      // will connect to POST /auth/login during integration
      // For now simulate login
      console.log("Login:", email, password);
      login({ email }, "mock-token-123");
      navigate("/submit");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center
                    justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md
                      w-full max-w-md">

        <h2 className="text-2xl font-bold text-center
                       text-gray-800 mb-6">
          CivicPulse Login
        </h2>

        <div className="flex flex-col gap-4">
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
            onClick={handleLogin}
            className="bg-blue-600 text-white py-2
                       rounded-lg hover:bg-blue-700
                       font-semibold"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register"
               className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}