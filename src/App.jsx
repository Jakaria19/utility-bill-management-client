import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="max-w-7xl mx-auto font-poppins">
      <Navbar />
      <div className="min-h-[calc(100vh-280px)] py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;

// import "./App.css";

// function App() {
//   return (
//     <>
//     </>
//   );
// }

// export default App;
