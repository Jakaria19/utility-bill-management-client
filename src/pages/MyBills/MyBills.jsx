import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const MyBills = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  // const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch payments
  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://utility-bill-management.vercel.app/payments?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPayments(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  }, [user]);

  // download single bill
  const handleDownload = (bill) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Utility Bill Receipt", 70, 20);

    doc.setFontSize(12);
    doc.text(`Bill ID: ${bill.billId || "N/A"}`, 20, 40);
    // doc.text(`Bill Title: ${bill.billTitle || "Utility Bill"}`, 20, 50);
    doc.text(`Amount: ${bill.amount} `, 20, 60);
    doc.text(`Date: ${new Date(bill.date).toLocaleDateString()}`, 20, 70);
    doc.text(`Username: ${bill.username || "N/A"}`, 20, 80);
    doc.text(`Phone: ${bill.phone || "N/A"}`, 20, 90);
    doc.text(`Address: ${bill.address || "Not provided"}`, 20, 100);
    doc.text(`Email: ${bill.email || user.email}`, 20, 110);
    doc.text("Status: Paid ", 20, 120);
    doc.text("Thank you for using Utility Bill System!", 40, 140);
    doc.save(`${bill.billTitle || "bill"}-${bill._id}.pdf`);
  };

  // // update bill
  // const handleUpdate = async (bill) => {
  //   const { value: newAmount } = await Swal.fire({
  //     title: "Update Bill Amount",
  //     input: "text",
  //     inputLabel: "Enter new amount",
  //     inputValue: bill.amount,
  //     showCancelButton: true,
  //     confirmButtonText: "Update",
  //   });

  //   if (!newAmount) return;

  //   fetch(`https://utility-bill-management.vercel.app/payments/${bill._id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ amount: newAmount }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.modifiedCount > 0) {
  //         Swal.fire("Updated!", "Bill amount updated successfully.", "success");
  //         setPayments((prev) =>
  //           prev.map((p) =>
  //             p._id === bill._id ? { ...p, amount: newAmount } : p
  //           )
  //         );
  //       }
  //     });
  // };
  const handleUpdate = async (bill) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Bill Information",
      html: `
      <input id="swal-username" class="swal2-input" readOnly placeholder="Name" value="${
        bill.username || ""
      }">
      <input id="swal-email" class="swal2-input" readOnly placeholder="Email" value="${
        bill.email || user.email
      }">
      <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${
        bill.phone || ""
      }">
      <input id="swal-address" class="swal2-input"  placeholder="Address" value="${
        bill.address || ""
      }">
      <input id="swal-amount" class="swal2-input" readOnly type="number" placeholder="Amount" value="${
        bill.amount || ""
      }">
      <input id="swal-date" class="swal2-input" readOnly type="date" value="${
        bill.date ? new Date(bill.date).toISOString().split("T")[0] : ""
      }">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        return {
          username: document.getElementById("swal-username").value,
          email: document.getElementById("swal-email").value,
          phone: document.getElementById("swal-phone").value,
          address: document.getElementById("swal-address").value,
          amount: document.getElementById("swal-amount").value,
          date: document.getElementById("swal-date").value,
        };
      },
    });

    if (!formValues) return;

    fetch(`https://utility-bill-management.vercel.app/payments/${bill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire(
            "Updated!",
            "Bill information updated successfully.",
            "success"
          );
          setPayments((prev) =>
            prev.map((p) => (p._id === bill._id ? { ...p, ...formValues } : p))
          );
        } else {
          Swal.fire("No Change!", "No fields were updated.", "info");
        }
      })
      .catch((err) => {
        console.error("Error updating bill:", err);
        Swal.fire("Error!", "Failed to update bill.", "error");
      });
  };

  //  delete bill
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4B1CCB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://utility-bill-management.vercel.app/payments/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setPayments((prev) => prev.filter((bill) => bill._id !== id));

              Swal.fire("Deleted!", "Your bill has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error("Error deleting bill:", err);
            Swal.fire("Error!", "Failed to delete bill.", "error");
          });
      }
    });
  };

  // download all
  const handleDownloadAll = () => {
    if (payments.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Bills Found!",
        text: "You have no paid bills to download.",
      });
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Utility Bill Report", 75, 20);

    const columns = [
      "#",
      "Bill ID",
      "Title",
      "Username",
      "Phone",
      "Amount",
      "Date",
      "Address",
    ];

    const rows = payments.map((b, i) => [
      i + 1,
      b.billId || "N/A",
      // b.billTitle || b.title || "Utility Bill",
      b.username || "N/A",
      b.phone || "N/A",
      b.amount || "N/A",
      new Date(b.date).toLocaleDateString(),
      b.address || "Not provided",
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [99, 46, 227], halign: "center" },
      styles: { halign: "center", fontSize: 9 },
    });

    const totalAmount = payments.reduce(
      (sum, b) => sum + Number(b.amount || 0),
      0
    );

    doc.text(
      `Total Bills Paid: ${payments.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(`Total Amount: ${totalAmount}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(
      "Thank you for using Utility Bill System!",
      60,
      doc.lastAutoTable.finalY + 35
    );
    doc.save(`My_Bills_Report_${new Date().toLocaleDateString()}.pdf`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (payments.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No bills paid yet.
      </div>
    );

  const totalAmount = payments.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        My Pay Bills
      </h2>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="font-semibold text-gray-500">
          Total Bills Paid:{" "}
          <span className="text-[#632EE3]">{payments.length}</span> | Total
          Amount:{" "}
          <span className="text-green-600 font-semibold">
            BDT {totalAmount}
          </span>
        </h1>
        <button
          onClick={handleDownloadAll}
          className="btn bg-linear-to-r from-[#4B1CCB] to-[#8748FF] text-white flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <FaFilePdf /> Download All
        </button>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-xl">
        <table className="table w-full text-center">
          <thead className="bg-base-200">
            <tr className="text-sm text-gray-700">
              <th>#</th>
              {/* <th>Bill ID</th> */}
              {/* <th>Title</th> */}
              <th>Username</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((bill, i) => (
              <tr key={bill._id} className="hover:bg-base-200 transition-all">
                <td>{i + 1}</td>
                {/* <td>{bill.billId || "N/A"}</td> */}
                {/* <td>{bill.billTitle || bill.title || "Utility Bill"}</td> */}
                <td>{bill.username || "N/A"}</td>
                <td>{bill.phone || "N/A"}</td>
                <td>{bill.email || user.email}</td>
                <td className="text-green-600 font-medium">{bill.amount} ৳</td>
                <td>{new Date(bill.date).toLocaleDateString()}</td>
                <td>{bill.address || "Not provided"}</td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => handleDownload(bill)}
                    className="btn btn-xs btn-outline text-[#632EE3] border-[#632EE3] hover:bg-[#632EE3] hover:text-white"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleUpdate(bill)}
                    className="btn btn-xs btn-outline text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    className="btn btn-xs btn-outline text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBills;