import { Link } from "react-router-dom";
import {
  ClipboardList,
  ShieldCheck,
  Clock,
  Brain,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-slate-900 font-sans antialiased m-0 p-0 overflow-x-hidden">
      
      {/* 🧭 Clean Navbar */}
      <nav className="w-full bg-white border-b border-gray-200 px-8 py-4 shadow-xs">
        <div className="w-full mx-auto flex items-center justify-between">
          {/* Logo and Brand Title Block */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-14 w-auto object-contain"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">
                CivicPulse
              </h1>
              <span className="text-xs text-indigo-600 font-semibold tracking-wider mt-0.5 leading-none">
                Smart. Simple. Transparent.
              </span>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-6">
            <Link
              to="/public-tracker"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              Track Complaints
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-xs"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 Introduction Header Banner */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center">
        <header className="max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
            Smart City Initiative
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 tracking-tight">
            Improve your neighborhood
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-gray-600 mt-3 tracking-tight">
            Why CivicPulse?
          </h3>
          <p className="text-base md:text-lg text-gray-500 mt-4 leading-relaxed">
            Bridging the gap between citizens and municipal administration. CivicPulse makes complaint reporting structured, trackable, and completely transparent by cutting down manual sorting processing times.
          </p>
        </header>

        {/* ⚡ Core Value Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <Info
            title="AI-assisted categorization"
            text="Complaints are parsed and automatically classified into the correct civic category fields instantly upon submission."
          />
          <Info
            title="Faster department routing"
            text="Issues are systematically dispatched straight to respective engineering departments based on regional urgency profiles."
          />
          <Info
            title="Transparent tracking"
            text="Citizens maintain real-time visibility over complaint status pipelines using an encrypted identifier key."
          />
        </div>

        {/* 🎯 Interactive Call To Action Container Card Block */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left mb-16">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Ready to improve your neighborhood?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your private workspace account to report active regional grievances or map historical tracking lists.
            </p>
          </div>

          <Link
            to="/login"
            className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Submit a Complaint Now
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* 📊 Live Statistics Row Grid Panel */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-xs grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 mb-16">
          <Stat icon={<ClipboardList />} value="Live" label="Complaints Registered" />
          <Stat icon={<Clock />} value="24×7" label="Availability" />
          <Stat icon={<Brain />} value="AI" label="Complaint Categorization" />
          <Stat icon={<ShieldCheck />} value="Secure" label="Citizen Tracking" />
        </section>

        {/* 📋 Application Process Steps Walkthrough */}
        <section className="py-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-10">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <Step number="1" title="Submit" text="Citizen reports the urban issue with details, category notes, and photos." />
            <Step number="2" title="Classify" text="The backend system categorizes the incoming database token seamlessly." />
            <Step number="3" title="Track" text="Citizens monitor the resolution updates through open interface nodes." />
            <Step number="4" title="Resolve" text="Authority reviews and updates complaint status." />
          </div>
        </section>
      </main>

      {/* 🏁 Footer Component Block */}
      <footer className="bg-white border-t border-gray-200 px-8 py-8 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-indigo-600">CivicPulse</span>
          </div>

          <div className="flex gap-6">
            <Link to="/login" className="hover:text-indigo-600 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-600 transition">
              Register
            </Link>
          </div>

          <p className="text-xs md:text-sm">© 2026 CivicPulse. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

function Info({ title, text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xs hover:shadow-md transition duration-300 flex flex-col items-start">
      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
        <CheckCircle size={20} />
      </div>
      <h4 className="font-bold text-gray-900 text-lg mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-500 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="p-6 flex items-center gap-4 justify-start text-left">
      <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs p-6 text-center hover:shadow-md transition duration-300">
      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4 shadow-xs">
        {number}
      </div>
      <h4 className="font-bold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-400 leading-relaxed">
        {text}
      </p>
    </div>
  );
}