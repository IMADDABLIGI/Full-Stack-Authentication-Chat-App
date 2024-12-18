import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import bg1 from "../assets/bg-pictures/image1.png";
import bg3 from "../assets/bg-pictures/image3.png";
import bg4 from "../assets/bg-pictures/image4.png";

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // localStorage.clear()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/user/register/", { username, password });
      if (res.status === 201) navigate("/signin");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="flex h-[100svh] items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${bg4})` }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-[500px] rounded-[10px] border border-gray-300 bg-gray-300 bg-opacity-50 px-[25px] py-[65px] shadow-xl">
        <h1 className="ml-[20px] self-start text-3xl font-bold mb-1"> Welcome Back </h1>
        <h3 className="ml-[20px] self-start text-xl mb-9 text-gray-500 "> Please enter your details </h3>

        <h3 className="ml-[20px] self-start text-xl text-gray-500 "> Email address </h3>
        <input
          className="w-[90%] p-[10px] my-[10px] border border-gray-300 rounded-md focus:border-red-600 transition-colors"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
          />
        <h3 className="ml-[20px] self-start text-xl text-gray-500 "> Password </h3>
        <input
          className="w-[90%] p-[10px] mt-[10px] border border-gray-300 rounded-md "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button className="w-[90%] p-[10px] mt-[25px] bg-primary rounded-md text-white text-xl" type="submit">
          Sign up
        </button>

        <div className="w-[90%] p-[10px] mt-[25px] border border-primary rounded-md items-center justify-center" type="submit">
          <p className="text-center text-xl">
          Continue with Google
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          <p className="text-lg text-gray-500"> Already have an account? </p>
          <Link to="/signin" className="text-lg text-primary border-b-[.7px] border-primary pb-0"> Sign in </Link>
        </div>

      </form>
    </div>
  );
}

export default Register;
