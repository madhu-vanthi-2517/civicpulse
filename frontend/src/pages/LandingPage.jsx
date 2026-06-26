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
    <div className="min-h-screen w-full bg-gray-50 text-slate-900 font-sans antialiased overflow-x-hidden">
      <nav className="w-full bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-12 w-auto object-contain sm:h-14"
            />

            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-none">
                CivicPulse
              </h1>
              <span className="text-[11px] sm:text-xs text-indigo-600 font-semibold tracking-wide mt-1 leading-none">
                Smart. Simple. Transparent.
              </span>
            </div>
          </Link>

          <Link
            to="/login"
            className="shrink-0 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      <main className="w-full max-w-screen-xl mx-auto px-4 py-10 sm:px-6 lg:px-8 text-center">
        <header className="max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Why CivicPulse?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-4 leading-relaxed">
            Bridging the gap between citizens and municipal administration.
            CivicPulse makes complaint reporting structured, trackable, and
            transparent by reducing manual sorting and processing delays.
          </p>
        </header>

        <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left mb-12">
          <div className="w-full">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Ready to improve your neighborhood?
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">
              Sign in to report civic issues, track complaint progress, and
              support faster resolution through a transparent public platform.
            </p>
          </div>

          <Link
            to="/login"
            className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Submit a Complaint Now
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <Info
            title="AI-assisted categorization"
            text="Complaints are parsed and automatically classified into the correct civic category fields instantly upon submission."
          />

          <Info
            title="Faster department routing"
            text="Issues are systematically dispatched to the respective departments based on category, urgency, and regional details."
          />

          <Info
            title="Transparent tracking"
            text="Citizens can track complaint progress using a complaint ID and stay updated through every stage of resolution."
          />
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 mb-12 overflow-hidden">
          <Stat
            icon={<ClipboardList />}
            value="Live"
            label="Complaints Registered"
          />
          <Stat icon={<Clock />} value="24×7" label="Availability" />
          <Stat icon={<Brain />} value="AI" label="Complaint Categorization" />
          <Stat icon={<ShieldCheck />} value="Secure" label="Citizen Tracking" />
        </section>

        <section className="py-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            How It Works
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Step
              number="1"
              title="Submit"
              text="Citizen reports the issue with details, location, and description."
            />

            <Step
              number="2"
              title="Classify"
              text="The system categorizes the complaint and identifies urgency."
            />

            <Step
              number="3"
              title="Track"
              text="Citizens monitor complaint progress using their complaint ID."
            />

            <Step
              number="4"
              title="Resolve"
              text="Authority reviews the issue and updates complaint status."
            />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 px-4 py-8 mt-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
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

          <p className="text-xs md:text-sm">
            © 2026 CivicPulse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Info({ title, text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-start">
      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
        <CheckCircle size={20} />
      </div>

      <h4 className="font-bold text-gray-900 text-lg mb-2">{title}</h4>

      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="p-6 flex items-center gap-4 justify-start text-left">
      <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl shrink-0">
        {icon}
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {value}
        </p>
        <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition duration-300">
      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
        {number}
      </div>

      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>

      <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}
