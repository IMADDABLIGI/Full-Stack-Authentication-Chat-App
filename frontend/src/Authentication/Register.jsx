import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import bg4 from "../assets/bg-pictures/image.png";
import glSvg from "../assets/bg-pictures/google.svg"
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return; // Prevent form submission if email is invalid
    }

    const userPart = username.split('@')[0];

    try {
      const response = await fetch("http://localhost:8000/api/user/register/",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      if (response.ok){
        const data = await response.json();
        console.log(data);
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  

  return (
    <div
      className="flex h-[100svh] items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${bg4})` }}
    >
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[380px] rounded-[10px] border border-gray-300 bg-gray-300 bg-opacity-50 px-[25px] py-[20px] shadow-xl"
      >
      <h1 className="ml-[20px] self-start text-xl font-bold mb-1"> Welcome Back </h1>
        <h3 className="ml-[20px] self-start text-md mb-6 text-gray-500 "> Please enter your details </h3>

        <h3 className="ml-[20px] self-start text-md text-gray-500 "> Username </h3>
        <input
          className="w-[90%] p-[10px] mb-[10px] border border-gray-300 rounded-md "
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
          />
        <h3 className="ml-[20px] self-start text-md text-gray-500 "> Email address </h3>
        <input
          className="w-[90%] p-[10px] mb-[10px] border border-gray-300 rounded-md "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <h3 className="ml-[20px] self-start text-md text-gray-500 "> Password </h3>
        <input
          className="w-[90%] p-[10px] border border-gray-300 rounded-md "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        <button className="w-[90%] p-[10px] mt-[25px] bg-primary rounded-md text-white text-[14px] font-bold" type="submit">
            Sign in
        </button>
        <div className="w-[90%] p-[10px] mt-[10px] flex border border-primary rounded-md items-center justify-center gap-2 bg-gray-400 bg-opacity-35" type="submit">
          <img src={glSvg} className="w-[18px] h-[18px]"/>
          <p className="text-[14px] font-bold text-white">
            Continue with Google
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          <p className="text-md text-gray-500"> Already have an account? </p>
          <Link to="/signin" className="text-md text-primary border-b-[.7px] border-primary pb-0"> Sign up </Link>
        </div>

      </form>
    </div>
  );
}

export default Register;
