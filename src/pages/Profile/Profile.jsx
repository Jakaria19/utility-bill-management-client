import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile(name, photo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile information has been updated successfully.",
          confirmButtonColor: "#7A6AE0",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#E8E4FF] to-[#F6F6FF] dark:from-[#1F1F2E] dark:to-[#2A2A3C]">
      <div className="bg-white dark:bg-[#1E1E2A] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/Y8mQskh/default-avatar.png"
            }
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-[#8C7BF0]"
          />
          <h2 className="text-2xl font-bold mt-3 text-gray-800 dark:text-gray-100">
            {user?.displayName || "No Name"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Enter new photo URL"
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] border-none text-white"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;