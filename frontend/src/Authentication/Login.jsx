import React, { useContext, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import ProfileContext from "./ProtectedRoute";
import bg1 from "../assets/bg-pictures/image1.png";
import bg3 from "../assets/bg-pictures/image3.png";
import bg4 from "../assets/bg-pictures/image4.png";

function Login() {
  const { setSocket } = useContext(ProfileContext);

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const createSocket = () => {
    const userSocket = new WebSocket("ws://localhost:8000/ws/api/");
    userSocket.onopen = function () {
      // console.log('WebSocket connection established');
      setSocket(userSocket);
      // userSocket.send(JSON.stringify({ message: 'Hello' }));
    };
    userSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data.message);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include",
      });

      // const res = await api.post('/api/token/', { username, password })
      if (res.ok) {
        const data = await res.json();
        // localStorage.setItem(ACCESS_TOKEN, data.access);
        // console.log(data.access);
        // localStorage.setItem(REFRESH_TOKEN, data.refresh);
        createSocket();
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="flex h-[100svh] items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${bg4})` }}
    >
      {/* <form onSubmit={handleSubmit} className='form-container'> */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[400px] rounded-[10px] border border-gray-300 bg-gray-300 bg-opacity-50 px-[25px] py-[50px] shadow-xl"
      >
        <h1 className="ml-[20px] self-start text-3xl font-bold mb-1"> Welcome Back </h1>
        <h3 className="ml-[20px] self-start text-xl mb-9 text-gray-500 "> Please enter your details </h3>

        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName..."
          autoFocus
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <button className="form-button" type="submit">
          {" "}
          Sign In{" "}
        </button>
        <Link className="form-register" to="/register">
          {" "}
          Sign Up{" "}
        </Link>
      </form>
    </div>
  );
}

export default Login;
