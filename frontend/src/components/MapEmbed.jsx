export default function MapEmbed({ locationName = "Puducherry Region" }) {
  return (
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-center min-h-[250px]">
      <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="text-sm font-semibold text-gray-700">OpenStreetMap Interactive Layer</span>
      <p className="text-xs text-gray-400 mt-1 max-w-xs">Leaflet.js component container tracking complaints in: <span className="font-medium text-gray-600">{locationName}</span></p>
    </div>
  );
}