import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";

const RootLayouts = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayouts;