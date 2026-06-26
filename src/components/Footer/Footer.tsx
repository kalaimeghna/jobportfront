const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </p>

        {/* Center Links */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Careers
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Contact
          </a>
        </div>

        {/* Right Side */}
        <p className="text-sm text-gray-500 mt-3 md:mt-0">
          Built with MERN 💙
        </p>
      </div>
    </footer>
  );
};

export default Footer;