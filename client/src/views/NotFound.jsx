import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-600">Page Not Found</h2>
      <p className="mt-4 text-gray-500 text-center max-w-lg">
        Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 text-white bg-gray-800 rounded-md hover:bg-gray-900 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
