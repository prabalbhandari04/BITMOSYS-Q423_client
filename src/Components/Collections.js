// Collections.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from "../redux/action";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "./Button"; // Ensure that the correct path to your Button component is provided
import "./style.css";
import LightningButton from "./Button"
import GoldenButtonComponent from "./GoldenButton";
export default function Collections() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);

  const fetchData = async () => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get("https://bitmosys-q423-server.onrender.com/api/v1/crypto/crypto");
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };

  const handleMouseMove = (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    const card = e.currentTarget;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const title = card.querySelector(".title");
    const sneaker = card.querySelector(".sneaker img");
    const description = card.querySelector(".info h3");
    const sizes = card.querySelector(".sizes");
    const purchase = card.querySelector(".purchase");

    card.style.transition = "none";
    title.style.transform = "translateZ(150px)";
    sneaker.style.transform = "translateZ(200px) rotateZ(-45deg)";
    description.style.transform = "translateZ(125px)";
    sizes.style.transform = "translateZ(100px)";
    purchase.style.transform = "translateZ(75px)";
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const title = card.querySelector(".title");
    const sneaker = card.querySelector(".sneaker img");
    const description = card.querySelector(".info h3");
    const sizes = card.querySelector(".sizes");
    const purchase = card.querySelector(".purchase");

    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    title.style.transform = "translateZ(0px)";
    sneaker.style.transform = "translateZ(0px) rotateZ(0deg)";
    description.style.transform = "translateZ(0px)";
    sizes.style.transform = "translateZ(0px)";
    purchase.style.transform = "translateZ(0px)";
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    fetchData(); // Fetch data when the component mounts
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      {data.map((item) => (
        <div
          key={item.id}
          className="glass-card p-6 rounded-lg hover:scale-105 transition-all cursor-pointer mx-2 my-2 w-1/5"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-aos="fade-up"
        >
          <img src={item.image} alt="" className="h-40 w-40 p-4 ml-4 object-cover rounded-md" />
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-secondary">
              <span className="font-primary font-bold text-xl md:mr-1">{item.name}</span> -
              <span className="text-l">{item.symbol}</span>
            </span>
          </div>
          <div className="flex justify-center items-center mt-2">
          <LightningButton></LightningButton>
          </div>
        </div>
      ))}
    </div>
  );
}
