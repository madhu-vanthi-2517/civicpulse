import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // will connect to POST /register later
    console.log("Register:", name, email, password);
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
          <button
            onClick={handleRegister}
            className="bg-green-600 text-white py-2 
                       rounded-lg hover:bg-green-700 
                       font-semibold"
          >
            Register
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