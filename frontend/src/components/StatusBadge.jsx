const StatusBadge = ({ status }) => {
  const colors = {
    Open: "bg-red-100 text-red-600",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
