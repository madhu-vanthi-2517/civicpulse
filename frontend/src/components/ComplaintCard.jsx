import { Droplet, Zap, Volume2, Trash2, AlertCircle, MapPin, Calendar } from 'lucide-react'; 
import UrgencyTag from './UrgencyTag';
import StatusBadge from './StatusBadge';

export default function ComplaintCard({ complaint, onStatusChange }) {
  const { id, title, description, category, urgency, status, location, date } = complaint;

  // 🌟 Helper to pick the perfect icon dynamically
  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'water':
        return <Droplet size={14} className="text-blue-500 shrink-0" />;
      case 'electrical':
      case 'electricity':
        return <Zap size={14} className="text-amber-500 shrink-0" />;
      case 'noise':
      case 'loud music':
        return <Volume2 size={14} className="text-purple-500 shrink-0" />;
      case 'garbage':
      case 'waste':
        return <Trash2 size={14} className="text-emerald-500 shrink-0" />;
      default:
        return <AlertCircle size={14} className="text-indigo-500 shrink-0" />;
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow duration-200 text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-indigo-600 mb-1">Complaint ID: {id}</p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            {getCategoryIcon(category)}
            <span>{category || "General"}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mt-1 capitalize leading-snug" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
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
        <div className="min-w-0 flex-1 flex items-center gap-1.5" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
          <MapPin size={14} className="text-gray-400 shrink-0" />
          <span>
            <span className="font-semibold text-gray-700 mr-0.5">Location:</span> {location}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-left sm:text-right">
          <Calendar size={14} className="text-gray-400" />
          <span>{date}</span>
        </div>
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
