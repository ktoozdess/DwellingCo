import React, { useState } from "react";


const RegistrationPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:5001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        // Check if the response is OK (status code 2xx)
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to register");
        }
  
        const data = await response.json();
        alert(data.message); // Show success message
      } catch (error) {
        alert(`Error: ${error.message}`); // Show error message
      }
    };
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create an Account</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div className="mt-4">
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
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-black hover:bg-gray-800 transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
