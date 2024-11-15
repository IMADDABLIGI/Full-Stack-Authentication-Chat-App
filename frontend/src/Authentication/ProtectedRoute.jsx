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
        const checkToken = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/token/checktoken/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials (cookies)
                    // body: JSON.stringify({
                    //     user: "IMAD"
                    // }),
                });
                
                const res = await response.json();
                if (response.ok) {
                    // console.log("Response Data: ", res.data);
                    setUser(res.data.username);
                    setIsAuthorized(true);
                } else {
                    console.error("Error:", res.error);
                    setIsAuthorized(false);
                }
                // const response = await api.post("/api/token/checktoken/");
                // if (response.status === 200)
                //     setIsAuthorized(true);
                // else 
                //     setIsAuthorized(false);

            } catch (error) {
                console.log(error);
                setIsAuthorized(false);
            }
        };

        const url = window.location.href;
        const checkUrlEnd = () => {
            if (url.endsWith('/'))
                checkToken()
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