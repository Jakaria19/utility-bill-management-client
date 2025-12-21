import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import BillDetails from "./pages/BillDetails";
import MyBills from "./pages/MyBills";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/bills/:id" element={<BillDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-bills"
          element={
            <PrivateRoute>
              <MyBills />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </div>
  );
}
