import { useState } from "react";

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = () => {
    // will connect to POST /complaint later
    console.log({ title, description, district, area });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white 
                      rounded-xl shadow-md p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Submit a Complaint
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Complaint Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg 
                       px-4 py-2 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Describe the issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="border border-gray-300 rounded-lg 
                       px-4 py-2 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border border-gray-300 rounded-lg 
                       px-4 py-2 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select District</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Tiruppur">Tiruppur</option>
            <option value="Madurai">Madurai</option>
          </select>
          <input
            type="text"
            placeholder="Area / Locality"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border border-gray-300 rounded-lg 
                       px-4 py-2 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 
                       rounded-lg hover:bg-blue-700 
                       font-semibold"
          >
            Submit Complaint
          </button>
        </div>

      </div>
    </div>
  );
}