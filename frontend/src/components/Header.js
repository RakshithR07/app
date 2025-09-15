import React from "react";
import { Link } from "react-router-dom";
import { Phone, HelpCircle, User, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white">
      {/* Top utility bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-end items-center space-x-6 text-sm text-gray-600">
            <Link to="#" className="hover:text-blue-600 transition-colors">
              Costco.com
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="#" className="hover:text-blue-600 transition-colors">
              Membership
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="#" className="flex items-center hover:text-blue-600 transition-colors">
              <HelpCircle className="w-4 h-4 mr-1" />
              Help Center
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="#" className="flex items-center hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 mr-1" />
              1-866-921-7925
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center">
              <span className="mr-1">🇺🇸</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <span className="text-gray-300">|</span>
            <Link to="#" className="flex items-center hover:text-blue-600 transition-colors">
              <User className="w-4 h-4 mr-1" />
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-8 h-8 border-2 border-blue-400 rounded-full"></div>
              </div>
              <div>
                <div className="text-red-600 font-bold text-2xl">COSTCO</div>
                <div className="bg-blue-600 text-white px-2 py-1 text-xl font-bold rounded">
                  travel
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="#"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm tracking-wide"
            >
              DEALS
            </Link>
            <Link
              to="#"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm tracking-wide"
            >
              DESTINATIONS
            </Link>
            <Link
              to="#"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm tracking-wide"
            >
              BUILD YOUR OWN TRIP
            </Link>
            <Link
              to="#"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm tracking-wide"
            >
              CRUISES
            </Link>
            <Link
              to="#"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm tracking-wide"
            >
              RENTAL CARS
            </Link>
            <Link
              to="#"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm tracking-wide"
            >
              THEME PARKS & SPECIALTY
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;