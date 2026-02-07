import StatusBadge from "./StatusBadge";

const ReportCard = ({ title, location, status }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>

      <StatusBadge status={status} />
    </div>
  );
};

export default ReportCard;
