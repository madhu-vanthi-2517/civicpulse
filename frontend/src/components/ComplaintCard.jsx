import UrgencyTag from './UrgencyTag';
import StatusBadge from './StatusBadge';

export default function ComplaintCard({ complaint, onStatusChange }) {
  const { title, description, category, urgency, status, location, date } = complaint;

  return (
    <div className="w-full max-w-full overflow-hidden bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow duration-200 text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-3">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-medium text-indigo-600 tracking-wider uppercase">{category}</span>
          <h3 className="text-lg font-bold text-gray-900 mt-0.5 leading-snug" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
            {title}
          </h3>
        </div>
        <div className="flex flex-col items-start gap-1.5 shrink-0 sm:items-end">
          <UrgencyTag urgency={urgency} />
          <StatusBadge status={status} />
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
        {description}
      </p>

      <div className="flex flex-col gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
          <span className="font-medium text-gray-700">Location:</span> {location}
        </div>
        <div className="whitespace-normal text-left sm:whitespace-nowrap sm:text-right">{date}</div>
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