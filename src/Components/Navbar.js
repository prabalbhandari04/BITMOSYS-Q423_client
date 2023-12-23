import { useState } from "react";
import { BiMenu, BiXCircle } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import "./button.css";
import LightningButton from "./Button";
import GoldenButtonComponent from "./GoldenButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`px-2 sm:px-2 py-2.5 relative ${menuOpen ? 'bg-background' : ''}`}>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#x" className="text-3xl font-bold text-secondary">
          II
        </a>
        <div className="flex text-secondary md:hidden">
          <button type="button" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <BiXCircle size={30} /> : <BiMenu size={30} />}
          </button>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-50"
            style={{ zIndex: 51 }}  // Ensure the overlay is above other content
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } justify-center items-center w-full h-full fixed top-0 left-0 md:w-auto md:order-1 z-52`}
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 text-xl text-secondary">
            <li className="color-secondary py-2 md:py-0 flex items-center">
              <a
                href="#x"
                className="py-4 pr-6 pl-0 color-secondary transition-all flex items-center"
              >
                Buy
                <span className="ml-2">
                  <FaBitcoin className="text-golden transform rotate-0 hover:rotate-90 transition-all" />
                </span>
              </a>
            </li>
            <GoldenButtonComponent>Wallet</GoldenButtonComponent>
          </ul>
        </div>
        <GoldenButtonComponent>Wallet</GoldenButtonComponent>
      </div>
      
    </nav>
  );
}
