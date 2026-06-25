import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import { 
  FileText, 
  AlignLeft, 
  MapPin, 
  Building, 
  Send, 
  Cpu, 
  AlertTriangle, 
  Upload, 
  Loader2 
} from "lucide-react"; 

const PUDUCHERRY_DISTRICTS = [
  "Puducherry",
  "Karaikal",
  "Mahe",
  "Yanam"
];

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { token, user } = useAuth();

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setArea(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLocLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location");
        setLocLoading(false);
      }
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !district) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await api.submitComplaint(
        { title, description, district, area, user_id: user?.id },
        token
      );
      if (data.id) {
        setResult(data);
        setTitle("");
        setDescription("");
        setDistrict("");
        setArea("");
        setImage(null);
      } else {
        setError("Submission failed. Try again.");
      }
    } catch (err) {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">
          Submit a Complaint
        </h2>

        <div className="flex flex-col gap-5 text-left">
          
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Complaint Title *
            </label>
            <div className="relative w-full">
              <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your complaint here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Description *
            </label>
            <div className="relative w-full">
              <AlignLeft size={18} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                placeholder="Describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              District *
            </label>
            <div className="relative w-full">
              <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Select District</option>
                {PUDUCHERRY_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Area / Locality
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter the location"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={locLoading}
                className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition disabled:opacity-50 whitespace-nowrap"
              >
                {locLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                Use Current Location
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Upload Evidence
            </label>
            <label className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition ${
              image ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-300 hover:bg-gray-50'
            }`}>
              {image ? (
                <div className="bg-emerald-500 text-white rounded-full p-1 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
              <span className={`text-xs font-medium ${image ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                {image ? image.name : "Click to select or upload an image"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
              <p className="text-xs text-red-400 mt-1">
                Make sure the backend server is running, or try again in a moment.
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 transition flex items-center justify-center gap-2 mt-2 text-sm"
          >
            <Send size={16} />
            <span>{loading ? "Submitting..." : "Submit Complaint"}</span>
          </button>

          {result && (
            <div className="mt-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-3">
                <Cpu size={16} className="text-emerald-600 animate-pulse" />
                <span>AI Classification Analysis Complete</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-2.5 text-center border border-emerald-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Category</p>
                  <p className="text-sm font-bold text-gray-700 mt-0.5 capitalize">{result.category || "N/A"}</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 text-center border border-emerald-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Urgency</p>
                  <p className="text-sm font-bold text-gray-700 mt-0.5 capitalize">{result.urgency || "N/A"}</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 text-center border border-emerald-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Department</p>
                  <p className="text-sm font-bold text-gray-700 mt-0.5 uppercase tracking-tight">{result.department || "N/A"}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-medium">
                Registered Base ID Target: <span className="text-gray-600 font-semibold">#{result.id}</span>
              </p>
            </div>
          )}

          {result?.duplicate_warning && (
            <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-2 items-start">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">
                  Similarity Warning: Found Duplicate Match #{result.similar_to_id}
                </p>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  A matching complaint structure has already been indexed at this zone. Your ticket was successfully appended to the queue for active human cross-review.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}