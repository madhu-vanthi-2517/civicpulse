import { useState } from "react";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title || !description || !district) {
      alert("Please fill all required fields");
      return;
    }
    // will connect to POST /complaint during integration
    console.log({ title, description, district, area });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white
                      rounded-xl shadow-md p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Submit a Complaint
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Puducherry Region — your complaint will be
          automatically categorized by AI
        </p>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              Complaint Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Pothole on main road"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              Description *
            </label>
            <textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              District *
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              {PUDUCHERRY_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              Area / Locality
            </label>
            <input
              type="text"
              placeholder="e.g. Anna Nagar, Lawspet"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-3
                       rounded-lg hover:bg-blue-700
                       font-semibold text-sm mt-2"
          >
            Submit Complaint
          </button>

          {submitted && (
            <p className="text-center text-sm
                          text-emerald-600 font-medium">
              ✓ Complaint submitted! AI is categorizing it...
            </p>
          )}

        </div>
      </div>
    </div>
  );
}