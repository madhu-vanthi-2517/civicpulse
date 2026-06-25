import { Droplet, Zap, Volume2, Trash2, AlertCircle, MapPin, Calendar } from 'lucide-react'; 
import UrgencyTag from './UrgencyTag';
import StatusBadge from './StatusBadge';

export default function ComplaintCard({ complaint, onStatusChange }) {
  const { title, description, category, urgency, status, location, date } = complaint;

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
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 text-left">
      
      {/* Upper Meta Header section */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          {/* 🌟 Dynamic Icon Selection based on category */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            {getCategoryIcon(category)}
            <span>{category || "General"}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mt-1 capitalize">{title}</h3>
        </div>
        
        {/* Custom status tag containers */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <UrgencyTag urgency={urgency} />
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Description Snippet Text Block */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">{description}</p>

      {/* Lower Meta Footer Section */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
        {/* Location with map pin icon */}
        <div className="flex items-center gap-1.5 truncate max-w-[70%]">
          <MapPin size={14} className="text-gray-400 shrink-0" />
          <span className="truncate">
            <span className="font-semibold text-gray-700 mr-0.5">Location:</span> {location}
          </span>
        </div>
        
        {/* Date with calendar icon */}
        <div className="flex items-center gap-1.5 shrink-0">
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