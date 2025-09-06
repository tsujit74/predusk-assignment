import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        {/* Logo */}
        <h1 className="font-extrabold text-2xl text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer">
          Predusk Portfolio
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Profile
          </Link>
          <Link
            to="/projects"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            to="/search"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Search
          </Link>
        </div>

        <button className="md:hidden text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
