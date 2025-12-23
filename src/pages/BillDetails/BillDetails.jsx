import { useParams } from "react-router";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

const BillDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  console.log(bill);
  const [error, setError] = useState(false);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  //  fetch single bill data
  useEffect(() => {
    fetch(`https://utility-bill-management.vercel.app/bills/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.result) {
          setBill(data.result);
          checkCurrentMonth(data.result.date);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching bill details:", err);
        setError(true);
      });
  }, [id]);

  //  check current month
  const checkCurrentMonth = (billDate) => {
    const billMonth = new Date(billDate).getMonth();
    const billYear = new Date(billDate).getFullYear();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setIsCurrentMonth(billMonth === currentMonth && billYear === currentYear);
  };

  //  handle pay
  const handlePaySubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value.trim();

    if (phone.length !== 11) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number!",
        text: "Please enter a valid 11-digit phone number.",
        confirmButtonColor: "#4B1CCB",
      });
      return;
    }

    const paymentInfo = {
      email: form.email.value,
      title: form.title.value,
      billId: form.billId.value,
      amount: form.amount.value,
      username: form.username.value,
      address: form.address.value,
      date: form.date.value,
      info: form.info.value,
      phone: phone,
    };

    console.log(paymentInfo);

    fetch("https://utility-bill-management.vercel.app/payments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Payment Successful",
          text: `You have successfully paid ${bill.amount}৳ for ${bill.title}`,
          icon: "success",
          confirmButtonColor: "#4B1CCB",
        });
        setIsModalOpen(false);
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Payment Failed!",
          text: "Please try again later.",
        })
      );
  };

  //  loading state
  if (!bill && !error) {
    return (
      <p className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </p>
    );
  }

  //  error state
  if (error) {
    return (
      <div className="text-center mt-32 text-red-500 text-lg">
        Failed to load bill details. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-20">
      <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden ">
        <img
          src={bill.image || "https://i.ibb.co/q7LsWQx/default-bill.jpg"}
          alt={bill.title}
          className="w-full h-64 md:h-80 object-cover"
        />

        <div className="p-6 sm:p-8 space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B1CCB]">
            {bill.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-700">
            <p className="flex items-center gap-2">
              <FaTag className="text-[#4B1CCB]" /> {bill.category}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#4B1CCB]" /> {bill.location}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#4B1CCB]" />{" "}
              {new Date(bill.date).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">
            <span className="font-bold mr-1">Description :</span>
            {bill.description}
          </p>

          <div className="flex items-center justify-between bg-base-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaMoneyBillWave className="text-green-500" /> Amount:
            </div>
            <p className="text-2xl font-bold text-[#4B1CCB]">{bill.amount}৳</p>
          </div>

          <div className="pt-6 text-center">
            {isCurrentMonth ? (
              <button
                onClick={() => setIsModalOpen("pay")}
                className="btn bg-linear-to-r from-[#4B1CCB] to-[#8748FF] text-white px-10 hover:shadow-lg transition-all"
              >
                Pay Bill
              </button>
            ) : (
              <div>
                <button
                  disabled
                  className="btn bg-gray-400 text-white cursor-not-allowed px-10"
                >
                  Pay Bill
                </button>
                <p className="text-red-500 mt-3 text-sm">
                  Only current month bills can be paid.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  pay modal */}
      {isModalOpen === "pay" && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-lg w-full">
            <h3 className="font-bold text-2xl text-center text-[#4B1CCB] mb-5">
              Pay Your Bill
            </h3>
            <input
              name="title"
              defaultValue={bill.title}
              readOnly
              placeholder="Tile"
              className="input input-bordered w-full mb-3"
            />
            <form onSubmit={handlePaySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="email"
                  defaultValue={user.email}
                  readOnly
                  className="input input-bordered w-full"
                />
                <input
                  name="billId"
                  defaultValue={bill._id}
                  readOnly
                  className="input input-bordered w-full"
                />
                <input
                  name="amount"
                  defaultValue={bill.amount}
                  readOnly
                  className="input input-bordered w-full"
                />
                <input
                  name="username"
                  defaultValue={user.name}
                  required
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                />
              </div>
              <input
                name="address"
                placeholder="Address"
                required
                className="input input-bordered w-full"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                required
                className="input input-bordered w-full"
              />
              <input
                name="date"
                readOnly
                value={new Date().toISOString().split("T")[0]}
                className="input input-bordered w-full"
              />
              <textarea
                name="info"
                placeholder="Additional Info (optional)"
                className="textarea textarea-bordered w-full"
              ></textarea>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="btn bg-[#4B1CCB] text-white w-1/2 mr-2"
                >
                  Confirm Payment
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn bg-gray-400 text-white w-1/2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BillDetails;
