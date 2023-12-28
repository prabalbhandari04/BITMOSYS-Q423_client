// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar";
import Collections from "./Components/Collections";
import Crypto from "./Components/Crypto"; // Import the Crypto component
import { useDispatch } from "react-redux";
import { fetchDataRequest } from "./redux/action";
import { Toaster } from "react-hot-toast"; // Import Toaster

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    dispatch(fetchDataRequest());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster here */}
              <Navbar />
              <Collections />
            </div>
          }
        />
        <Route
          path="/buy-crypto"
          element={
            <div>
              <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster here */}
              <Navbar />
              <Crypto />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
