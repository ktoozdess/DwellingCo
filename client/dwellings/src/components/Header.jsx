import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-bold text-black">DwellingCo</h1>
          <p className="text-gray-500">Rent your dream!</p>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {/* <li>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Properties
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                About Us
              </a>
            </li> */}
            
          </ul>
        </nav>
        <div className="space-x-2">
          <a
            href="#"
            className=" border-black border text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
          >
            Log in
          </a>
          <a
            href="#"
            className="bg-black text-white border-black border py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
