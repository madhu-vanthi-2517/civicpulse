import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import { Eye, EyeOff } from "lucide-react"; // 👁️ Import icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ Visibility State
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
      
      console.log("Database Auth Response Object:", data);

      if (data.access_token) {
        const cleanedRole = data.role ? data.role.toLowerCase().trim() : "";
        console.log("Processed normalized user role string:", cleanedRole);

        login(
          { email: data.email, role: cleanedRole, id: data.id },
          data.access_token
        );

        // Standard timing offset allows the Context API state to complete mapping safely
        setTimeout(() => {
          if (cleanedRole === "authority" || cleanedRole === "admin") {
            console.log("Routing directly to Authority Admin Dashboard...");
            navigate("/admin", { replace: true });
          } else {
            console.log("Routing directly to Citizen Submission Hub...");
            navigate("/submit", { replace: true });
          }
        }, 100);

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
        
        {/* 🌟 Updated Branding Block: Shifted logo upside and closed the spacing gap */}
        <div className="flex flex-col items-center mb-2">
          <img 
            src="/logo_civicpulse.jpeg" 
            alt="CivicPulse Logo" 
            className="w-[180px] h-auto object-contain -mt-6" 
          />
          <h2 className="text-2xl font-bold text-center text-gray-800 -mt-2">
            Login
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Password field with Eye Toggle Icon */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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