import logo from "./Screenshot 2024-09-28 143815.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          <img src={logo} alt="BeatPad" />
        </a>
        <div className="space-x-4">
          <a
            href="/"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Contact Us
          </a>
          <a
            href="/alternate"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Alternate Versions
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
