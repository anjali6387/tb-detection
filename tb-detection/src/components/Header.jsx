import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold">
          TB Detection AI
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/diagnosis" className="hover:text-blue-200 transition-colors">
                Diagnosis
              </Link>
            </li>
            <li>
              <Link to="/visualization" className="hover:text-blue-200 transition-colors">
                3D View
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
