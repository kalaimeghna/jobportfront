import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-blue-600">
              Job Portal
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              © {new Date().getFullYear()} Job Portal. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Jobs
            </Link>

            <Link
              to="/companies"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Companies
            </Link>

            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="mailto:admin@example.com"
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 text-center text-sm text-gray-400">
          Built with ❤️ using the MERN Stack
        </div>
      </div>
    </footer>
  );
};

export default Footer;