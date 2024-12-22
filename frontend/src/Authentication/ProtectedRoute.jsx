import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const ProfileContext = createContext();

export default ProfileContext;

export const ProtectedRoute = ({ child }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log(data.sender, ":", data.message);
        setMessages((prevMsg) => [...prevMsg, data]); //to use the most recent value of messages bcs useEffect may result in outdated values.
      };
    }
  }, [socket]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/token/checktoken/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const res = await response.json();
        if (response.ok) {
          // console.log("Response Data: ", res.data);
          setUser(res.data.username);
        } else {
          // console.error("Error:", res.error);
          navigate("/signin");
        }
      } catch (error) {
        // console.log(error);
        navigate("/signin");
      }
    };

    const url = window.location.href;
    const checkUrlEnd = () => {
      if (url.endsWith("/")) checkToken();
    };
    if (url) checkUrlEnd();
  }, [window.location.href]);

  const userInfoData = {
    user,
    setUser,
    socket,
    setSocket,
    messages,
    setMessages,
  };

  return (
    <ProfileContext.Provider value={userInfoData}>
      {child}
    </ProfileContext.Provider>
  );
};
