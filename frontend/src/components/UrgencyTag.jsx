export default function UrgencyTag({ urgency }) {
  const styles = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  const normalized = urgency?.toLowerCase() || 'low';

  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${styles[normalized] || styles.low}`}>
      {urgency}
    </span>
  );
}