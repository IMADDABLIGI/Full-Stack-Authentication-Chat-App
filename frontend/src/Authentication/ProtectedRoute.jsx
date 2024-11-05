import { createContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const ProfileContext = createContext();

export default ProfileContext;

export const ProtectedRoute = ({ child }) => {
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(()=>{
        if (socket){
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // console.log(data.sender, ":", data.message);
                setMessages(prevMsg => [...prevMsg, data]) //to use the most recent value of messages bcs useEffect may result in outdated values.
            };
        }
    },[socket])

    useEffect(() => {
        const refreshToken = async () => {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            try {
                const resp = await api.post("/api/token/refresh/", { refresh: refreshToken });
                if (resp.status === 200) {
                    // localStorage.setItem(ACCESS_TOKEN, resp.data.access);
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (err) {
                console.log(err);
                setIsAuthorized(false);
            }
        };
        
        // const token = localStorage.getItem(ACCESS_TOKEN);
        // if (!token) {
        //     setIsAuthorized(false);
        //     console.log("No Authorization");
        //     return;
        // }
        // const decode = jwtDecode(token);
        // const tokenExpiration = decode.exp; // in seconds
        // const nowDate = Date.now() / 1000;

        // if (tokenExpiration < nowDate)
        //     await refreshToken();
        // else
        //     setIsAuthorized(true);
        const auth = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/token/checktoken/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials (cookies)
                    body: JSON.stringify({
                        user: "IMAD"
                    }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log("Response Data:", data);
                    setIsAuthorized(true);
                } else {
                    console.error("Error:", response.status);
                    setIsAuthorized(false);
                }
                // const response = await api.post("/api/token/checktoken/", { user: "IMAD" });
                // if (response.status === 200) {
                //     // const res = await response.json();
                //     // setUser(response.user);
                // } else {
                //     console.error("Unauthorized:", response.status);  // Log unauthorized errors
                // }
            } catch (error) {
                console.log(error);
                setIsAuthorized(false);
            }
        };

        const url = window.location.href;
        const checkUrlEnd = () => {
            if (url.endsWith('/'))
                auth()
            if (url.endsWith('/login'))
                setIsAuthorized(true);
            };
        if (url)
            checkUrlEnd();
    }, [window.location.href]);

    const userInfoData = {
        user,
        setUser,
        socket,
        setSocket,
        messages, 
        setMessages
    };
    
    if (isAuthorized === null) {
        return <div style={{color:"white"}}> Loading... </div>;
    }
    return (
        <ProfileContext.Provider value={userInfoData}>
            {isAuthorized ? child : <Navigate to={"/login"} />}
        </ProfileContext.Provider>
    );
}