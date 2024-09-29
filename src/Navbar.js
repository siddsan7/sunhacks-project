import logo from "./Screenshot 2024-09-28 143815.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          <img src={logo} alt="BeatPad" />
        </a>
        <div className="space-x-4">
        
        <a href="/" className="hover:bg-gray-700 hover:text-white transition-colors duration-500 p-8 rounded">
          Home
        </a>
          <a
            href="/about"
            className="hover:bg-gray-700 hover:text-white transition-colors duration-500 p-8 rounded"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:bg-gray-700 hover:text-white transition-colors duration-500 p-8 rounded"
          >
            Contact Us
          </a>
          <a
            href="/alternate"
            className="hover:bg-gray-700 hover:text-white transition-colors duration-500 p-8 rounded"
          >
            Alternate Versions
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
