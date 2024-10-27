import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const AboutUs = () => { 
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-900">About DwelingCo</h1>
        <p className="text-lg leading-relaxed text-center text-gray-600 mb-8">
          Welcome to <span className="font-semibold text-gray-900">DwelingCo</span>, your reliable partner in finding rental homes. 
          We are currently focused on helping you find the best properties.
          Though we are just beginning in this region, we aim to expand our services throughout Italy and beyond.
        </p>

        <p className="text-lg leading-relaxed text-center text-gray-600 mt-8">
          At DwelingCo, we believe in making the process of finding your new home as simple and transparent as possible. 
          We are dedicated to offering a seamless experience and ensuring that every renter has access to the best 
          homes that meet their needs.
        </p>

        <p className="text-lg leading-relaxed text-center text-gray-600 mt-4">
          As we grow, our mission remains the same: to provide high-quality, affordable rental housing options for everyone. 
          We are here to assist you in finding your perfect <span className="font-semibold text-gray-900">Dwelling</span>.
        </p>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Currently Available in Lombardy</h2>
          <p className="text-lg text-gray-600 mt-2">Explore our listings in Milan, Pavia, and other cities within the region.</p>
        </div>
        <div className="flex justify-center mt-10">
            <Link to="/">
                <button className="bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">
                    Explore Listings
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
