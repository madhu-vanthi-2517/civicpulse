import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await api.login(email, password);
      
      // DEBUG: View your database backend payload structure in the console
      console.log("Database Auth Response Object:", data);

      if (data.access_token) {
        // Safe string sanitization for Postgres casing variations
        const cleanedRole = data.role ? data.role.toLowerCase().trim() : "";
        console.log("Processed normalized user role string:", cleanedRole);

        login(
          { email: data.email, role: cleanedRole, id: data.id },
          data.access_token
        );

        // Redirect precisely to match App.jsx route protection logic
        if (cleanedRole === "authority" || cleanedRole === "admin") {
          console.log("Routing directly to Authority Admin Dashboard...");
          navigate("/admin");
        } else {
          console.log("Routing directly to Citizen Submission Hub...");
          navigate("/submit");
        }
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login endpoint failure:", err);
      setError("Cannot connect to server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          CivicPulse Login
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}