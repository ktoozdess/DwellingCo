import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавляем навигацию
import { useAuth } from "../../Provider/AuthProvider";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Индикатор загрузки
  const [error, setError] = useState(null); // Обработка ошибок
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true); // Обновляем статус
      navigate("/"); // Перенаправляем на страницу профиля
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign In</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-black hover:bg-gray-800 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
