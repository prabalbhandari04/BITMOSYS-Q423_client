// App.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar";
import Collections from "./Components/Collections";
import { useDispatch } from "react-redux";
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from "./redux/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    dispatch(fetchDataRequest()); // This dispatch is optional and depends on your use case
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Collections />
    </>
  );
}

export default App;
