import React, { useEffect, useState } from 'react';
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login/logout

  useEffect(() => {
    console.log("jjd");
    // Check if user is logged in when the component mounts
    const checkLoginStatus = async () => {
      try {
        // const response = await fetch('http://127.0.0.1:8000/api/check-session/', {
        //   method: 'GET',
        //   credentials: 'include',
        //   headers: { 'Content-Type': 'application/json' },'
        // const rs= await axios.get('http://127.0.0.1:8000/api/check-session/');
        const response = await axios.get('http://127.0.0.1:8000/api/check-session/', {
          withCredentials: true,  // Include credentials in the request
        });
        // });

        console.log(response.ok);
        // const data = await response.json();
        // console.log(data)
        if (response.data.isLoggedIn == 'True') {
          setIsLoggedIn(true);
          console.log(data) 
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  const handleLogout = async() => {
    // Perform logout actions
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/logout/', {
          withCredentials: true,  // Include credentials in the request
        });
        console.log(response);
          if (response.data.isLoggedIn == 'False') {
            setIsLoggedIn(false);

              // alert(data.message)
          }
      } catch (error) {
          console.error('Try Again Later:', error);
          // setErrorMessage('An error occurred, please try again.');
      }
    // setActive("Home"); // Reset active link to Home
  };

  return (
    <nav className="flex items-center justify-between w-full py-6 bg-black-900 navbar">
      <h3 className="text-3xl font-extrabold text-stone-100">Trend Analyser</h3>

      <ul className="items-center justify-end flex-1 hidden list-none sm:flex">
        {navLinks.map((nav, index) => (
          <li
          key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active === nav.title ? "text-blue-300" : "text-dimWhite"
          } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          onClick={() => setActive(nav.title)}
        >
          <a href={`/${nav.id}`}>{nav.title}</a>
        </li>
        ))}

        {/* Conditional rendering for Login/Logout button */}
        {isLoggedIn ? (
          <button
            className="px-4 py-2 ml-10 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-4 py-2 ml-10 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            
          > 
          <Link rel="noopener noreferrer" to="/login" className="">
          Login
          </Link>
          {/* <a href={'/login'} >  </a> */}
           
          </button>
        )}
      </ul>

      <div className="flex items-center justify-end flex-1 sm:hidden">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="flex flex-col items-start justify-end flex-1 list-none">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}

            {/* Conditional rendering for Login/Logout button in mobile view */}
            {isLoggedIn ? (
              <button
                className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;