import { useState } from "react";
import axios from "axios";

export default function AddBill() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bills", {
        title,
        amount,
        date,
      });
      alert("✅ Bill added successfully!");
      setTitle("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error(error);
      alert("failed to add bill");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Add New Bill</h2>
      <input
        type="text"
        placeholder="Bill Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-3"
      />
      <input
        type="number"
        placeholder="Amount (Tk)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full mb-3"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input input-bordered w-full mb-3"
      />
      <button className="btn btn-primary w-full">Add Bill</button>
    </form>
  );
}
