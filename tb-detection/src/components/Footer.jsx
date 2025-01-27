import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">&copy; 2023 TB Detection AI. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
              Help
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
              Support
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
