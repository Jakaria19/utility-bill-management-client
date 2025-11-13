import { Link } from "react-router-dom";

export default function BillCard({ bill }) {
  const dateStr = new Date(bill.date).toLocaleDateString();
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={bill.image || "https://via.placeholder.com/400x200"}
        alt={bill.title}
        className="w-full h-36 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-lg">{bill.title}</h3>
      <p className="text-sm text-gray-500">
        {bill.category} • {bill.location}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-md font-bold">৳{bill.amount}</span>
          <div className="text-xs text-gray-400">{dateStr}</div>
        </div>
        <Link to={`/bills/${bill._id}`} className="btn btn-sm btn-outline">
          See Details
        </Link>
      </div>
    </div>
  );
}
