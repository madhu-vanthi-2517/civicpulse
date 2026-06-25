import { Link } from "react-router-dom";
import {
  ClipboardList,
  ShieldCheck,
  Clock,
  Brain,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-20 w-20 object-contain"
            />

            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-none">
                CivicPulse
              </h1>
              <p className="text-sm text-indigo-600 font-semibold mt-2">
                Smart. Simple. Transparent.
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </nav>


      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Be a responsible citizen.
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Your small report can help improve public services.
            </p>
          </div>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition flex items-center gap-2"
          >
            Submit a Complaint Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      
      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why CivicPulse?
              </h2>

              <p className="text-gray-600 leading-8 text-base md:text-lg mb-10">
                CivicPulse bridges the gap between citizens and municipal
                administration by making complaint reporting structured,
                trackable, and transparent.
                
              </p>
            <div className="mt-12 grid md:grid-cols-3 gap-6">

            <div className="grid md:grid-cols-3 gap-6">
              <Info
                title="AI-assisted categorization"
                text="Complaints are automatically classified into the right civic category."
              />

              <Info
                title="Faster department routing"
                text="Issues are routed based on category, urgency, and department mapping."
              />

              <Info
                title="Transparent tracking"
                text="Citizens can track complaint progress using a complaint ID."
              />
            </div>
          </div>
        </div>
      </section>

      

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <Stat icon={<ClipboardList />} value="Live" label="Complaints Registered" />
          <Stat icon={<Clock />} value="24×7" label="Availability" />
          <Stat icon={<Brain />} value="AI" label="Complaint Categorization" />
          <Stat icon={<ShieldCheck />} value="Secure" label="Citizen Tracking" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-5">
          <Step number="1" title="Submit" text="Citizen reports the issue with details and location." />
          <Step number="2" title="Classify" text="AI categorizes the complaint automatically." />
          <Step number="3" title="Track" text="Citizen tracks status using complaint ID." />
          <Step number="4" title="Resolve" text="Authority reviews and updates complaint status." />
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-indigo-600">CivicPulse</span>
          </div>

          <div className="flex gap-5">
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-600">
              Register
            </Link>
          </div>

          <p>© 2026 CivicPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Info({ title, text }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:bg-white hover:shadow-md transition">
      <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <CheckCircle size={18} />
      </div>

      <h4 className="font-bold text-gray-900 mb-3">
        {title}
      </h4>

      <p className="text-sm text-gray-600 leading-7">
        {text}
      </p>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="p-6 flex items-center gap-4">
      <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-center hover:shadow-md transition">
      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
        {number}
      </div>

      <h3 className="font-bold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
