import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const clearInput = (e) => {
    e.preventDefault();
    setInputs({
        username: '',
        email: '',
        password: '',
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(inputs)
  const username = inputs.username;
  const email = inputs.email;
  const password = inputs.password;
  console.log(username, email, password)

  try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              username,
              email,
              password,
          }),
          credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
          alert(data.message)
      }
      else{
        alert(data.message)
        navigate("/login");
      }
  } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred, please try again.');
  }
};

  return (
    <div className="flex items-center justify-center h-screen px-4 bg-primary">
      <div className="flex flex-col w-full max-w-xl overflow-hidden bg-[#212e48] rounded-lg shadow-lg md:flex-row text-black">
        
        {/* Part 1: Basic Information */}
        <div className="w-full p-8 text-white">
          <p className="mb-4 text-3xl font-bold text-gradient">Register</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="username" className="text-sm font-semibold">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="px-3 py-2 text-black border border-gray-300 rounded-md"
                placeholder=""
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="px-3 py-2 text-black border border-gray-300 rounded-md"
                placeholder=""
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="px-3 py-2 text-black border border-gray-300 rounded-md"
                placeholder=""
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full p-4 mt-4 text-white bg-blue-500 rounded-xl" onClick={(e) => handleSubmit(e) && clearInput(e)}>Sign up</button>
          </form>
          {err && <p className="mt-2 text-red-500">{err}</p>}
          <p className="mt-4 text-lg">
            Already have an account?
            <Link to="/login" className="ml-1 text-blue-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
