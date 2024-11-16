import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();


  useEffect(() => {
    // Проверка токена при загрузке компонента
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Пользователь авторизован
    }
  }, []);

  // Функция для выхода
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };


  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-bold text-black">Dwelling</h1>
          <p className="text-gray-500">Rent your dream!</p>
        </Link>
        <nav>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="border-black border text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 border-black border text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <Link
                to="/signin"
                className="border-black border text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white border-black border py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
