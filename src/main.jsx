import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/Routes";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  // <h1>Hello World! My app is running.</h1>

  // <React.StrictMode>
  //   <AuthProvider>
  //     <RouterProvider router={router} />
  //   </AuthProvider>
  // </React.StrictMode>

  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//         <ToastContainer />
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "../context/AuthContext";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <BrowserRouter>
// //     <AuthProvider>
// //       <App />
// //       <ToastContainer />
// //     </AuthProvider>
// //   </BrowserRouter>
// // );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
