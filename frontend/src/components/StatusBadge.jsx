export default function StatusBadge({ status }) {
  const styles = {
    pending: "bg-gray-100 text-gray-700 ring-gray-600/20",
    "in progress": "bg-blue-100 text-blue-700 ring-blue-700/20",
    resolved: "bg-emerald-100 text-emerald-700 ring-emerald-600/20"
  };

  const normalized = status?.toLowerCase() || 'pending';

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[normalized] || styles.pending}`}>
      {status}
    </span>
  );
}