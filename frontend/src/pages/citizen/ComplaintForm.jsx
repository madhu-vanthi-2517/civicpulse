import { useState } from 'react';

export default function ComplaintForm() {
  // State to track whether user is viewing the Login (Sign In) or Register view
  const [isLogin, setIsLogin] = useState(true);
  
  // Comprehensive state object for capturing user inputs cleanly
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // Reusable change tracking handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Day 2 Sandbox Check - Data Prepared:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-left">
      <div className="sm:mx-auto w-full max-w-md px-4">
        <h2 className="text-center text-3xl font-extrabold !text-slate-900 tracking-tight">
          CivicPulse
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {isLogin ? "Access your citizen feedback timeline" : "Create a verified resident account"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-xl border border-gray-100 sm:px-10">
          
          {/* Section 1: Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-1/2 pb-3 text-center font-semibold text-sm border-b-2 transition-all cursor-pointer ${
                isLogin ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-1/2 pb-3 text-center font-semibold text-sm border-b-2 transition-all cursor-pointer ${
                !isLogin ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-500'
              }`}
            >
              Register Account
            </button>
          </div>

          {/* Section 2: Interactive Input Matrix */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter your first and last name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="name@example.com"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="9876543210"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Engine */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                {isLogin ? 'Sign In to Portal' : 'Register Account'}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}