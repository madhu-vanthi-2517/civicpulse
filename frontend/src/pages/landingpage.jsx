import { Link } from "react-router-dom";
import {
  ClipboardList,
  Search,
  UserCheck,
  ShieldCheck,
  Clock,
  Brain,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-14 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-indigo-600">CivicPulse</h1>
              <p className="text-xs text-gray-500">Your City. Your Voice.</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">
              Home
            </Link>
            <Link to="/track" className="text-gray-600 hover:text-indigo-600">
              Track Complaint
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
              Submit Complaint
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
              My Complaints
            </Link>
          </div>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-5">
              <ShieldCheck size={14} />
              Smart. Simple. Transparent.
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Report Issues. <br />
              Improve Your City.
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-xl mb-7 leading-relaxed">
              CivicPulse helps citizens report civic issues, track complaint
              progress, and support faster resolution through AI-assisted
              complaint management.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition flex items-center gap-2"
              >
                <ClipboardList size={17} />
                Submit a Complaint
              </Link>

              <Link
                to="/track"
                className="bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition flex items-center gap-2"
              >
                <Search size={17} />
                Track Complaint
              </Link>

              <Link
                to="/login"
                className="bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition flex items-center gap-2"
              >
                <UserCheck size={17} />
                My Complaints
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-500" />
                Secure & Reliable
              </span>
              <span className="flex items-center gap-2">
                <UserCheck size={16} className="text-blue-500" />
                Transparent Process
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-purple-500" />
                Faster Tracking
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="rounded-2xl bg-blue-50 p-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 max-w-sm mx-auto">
                <p className="text-xs font-bold text-blue-600 uppercase mb-2">
                  Sample Complaint
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Water Leakage
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Pipeline leakage near residential street.
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Complaint ID</span>
                    <span className="font-semibold">#CP001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-blue-600">Water</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-semibold text-amber-600">In Progress</span>
                  </div>
                </div>

                <Link
                  to="/track"
                  className="mt-5 block text-center bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Track Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
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
          <Step number="1" title="Submit" text="Report the issue with details and location." />
          <Step number="2" title="Classify" text="AI categorizes the complaint automatically." />
          <Step number="3" title="Track" text="Use complaint ID to check live status." />
          <Step number="4" title="Resolve" text="Authorities update progress and resolution." />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14">
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

      <footer className="bg-white border-t border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="/logo_civicpulse.jpeg"
              alt="CivicPulse Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-bold text-indigo-600">CivicPulse</span>
          </div>

          <div className="flex gap-5">
            <Link to="/track" className="hover:text-indigo-600">
              Track Complaint
            </Link>
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
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}
