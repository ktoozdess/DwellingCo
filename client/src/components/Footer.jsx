import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Footer = () => {
    const location = useLocation(); 
    const query = new URLSearchParams(location.search);
  return (
    <footer className="bg-white shadow mt-10 ">
        {query.size !== 0 && (
            <div className="flex flex-row justify-center p-8">
            <h4>
                <Link to="/aboutus">
                    <button className="bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">
                        About Us
                    </button>
                </Link>
            </h4>
        </div>
        )}
        <div className="max-w-7xl mx-auto py-4 text-center">
            <p className="text-gray-600">© 2024 Dwelling</p>
        </div>
    </footer>
  );
};

export default Footer;
