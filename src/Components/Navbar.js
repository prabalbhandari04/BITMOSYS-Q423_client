import { useState } from "react";
import { BiMenu, BiXCircle } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./button.css";
import GoldenButtonComponent from "./GoldenButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`px-2 sm:px-2 py-2.5 relative ${menuOpen ? 'bg-background' : ''}`}>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="text-3xl font-bold text-secondary">
          II
        </Link>
        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-50"
            style={{ zIndex: 51 }}  // Ensure the overlay is above other content
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        {/* Combined Buy and GoldenButton in a single row */}
        <div className="flex items-center">
          <Link to="/buy-crypto" className="py-4 pr-6 pl-0 text-secondary transition-all">
            Buy
          </Link>
          <GoldenButtonComponent hoverShimmer>Wallet</GoldenButtonComponent>
        </div>
      </div>
    </nav>
  );
}
