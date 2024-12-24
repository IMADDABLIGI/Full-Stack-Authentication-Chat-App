import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProfileContext = createContext();

export default ProfileContext;

export const ProtectedRoute = ({ child }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("change in socket in Profile Context");
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     console.log("Protected Route");
  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.type === "new_message")
  //         console.log("Mesage :", data.message);
  //     };
  //   }
  // }, [socket]);

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
  };

  return (
    <ProfileContext.Provider value={userInfoData}>
      {child}
    </ProfileContext.Provider>
  );
};
