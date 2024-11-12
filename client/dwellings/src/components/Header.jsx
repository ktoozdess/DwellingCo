import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена при загрузке компонента
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Пользователь авторизован
    }
  }, []);

  // const handleLogout = () => {
  //   // Удаляем токен из localStorage и обновляем состояние
  //   localStorage.removeItem("token");
  //   setIsAuthenticated(false);
  // };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-bold text-black">DwellingCo</h1>
          <p className="text-gray-500">Rent your dream!</p>
        </Link>
        <nav>
        </nav>
        {isAuthenticated ? (
              <>
                
                <Link
                  to="/profile"
                  className=" border-black border text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
                >
                  Profile
                </Link>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/signin"
                  className=" border-black border text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
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
          
        
      </div>
    </header>
  );
};

export default Header;
