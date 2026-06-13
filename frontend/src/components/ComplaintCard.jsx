import UrgencyTag from './UrgencyTag';
import StatusBadge from './StatusBadge';

export default function ComplaintCard({ complaint, onStatusChange }) {
  const { title, description, category, urgency, status, location, date } = complaint;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 text-left">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <span className="text-xs font-medium text-indigo-600 tracking-wider uppercase">{category}</span>
          <h3 className="text-lg font-bold text-gray-900 mt-0.5">{title}</h3>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <UrgencyTag urgency={urgency} />
          <StatusBadge status={status} />
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
        <div>
          <span className="font-medium text-gray-700">Location:</span> {location}
        </div>
        <div>{date}</div>
      </div>

      {/* Action buttons appear for administrative views if a handler is passed */}
      {onStatusChange && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2">
          <button 
            onClick={() => onStatusChange('In Progress')}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Investigate
          </button>
          <button 
            onClick={() => onStatusChange('Resolved')}
            className="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            Mark Resolved
          </button>
        </div>
      )}
    </div>
  );
}