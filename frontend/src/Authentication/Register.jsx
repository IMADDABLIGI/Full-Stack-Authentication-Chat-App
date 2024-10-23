import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import "../styles/Form.css"

function Register() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    localStorage.clear()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/user/register/', { username, password })
            if (res.status === 201)
                navigate("/login")
        } catch (err) {
            alert(err)
        }
    }   

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1> Register </h1>
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
            <button className="form-button" type="submit"> Register </button>
        </form>
  )
}

export default Register
