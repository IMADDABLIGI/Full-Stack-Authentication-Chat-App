import React, { useContext , useState } from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Form.css"
import ProfileContext from './ProtectedRoute'

function Login() {
    const {setUser, setSocket} = useContext(ProfileContext);

    const navigate = useNavigate();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    const createSocket = () => {
        const userSocket = new WebSocket('ws://127.0.0.1:8000/ws/api/');
        userSocket.onopen = function() {
            // console.log('WebSocket connection established');
            setSocket(userSocket)
            // userSocket.send(JSON.stringify({ message: 'Hello' }));
        };
        userSocket.onmessage = function(event) {
            const data = JSON.parse(event.data)
            console.log('Message from server:', data.message);
        };
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/token/', { username, password })
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                setUser(username);
                createSocket();
                navigate("/");
            }
        } catch (err) {
            alert(err)
        }
    }   

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1> Login </h1>
            <input
                className='form-input'
                type='text'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='UserName...'
            />
            <input
                className='form-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password...'
            />
            <button className="form-button" type="submit"> Login </button>
            <Link className="form-register" to="/register"> Register </Link>
        </form>
  )
}

export default Login
