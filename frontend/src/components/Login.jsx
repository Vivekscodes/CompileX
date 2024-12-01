import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const { loading, error, dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    };

    console.log(credentials)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                credentials,
                { withCredentials: true }
            );
            console.log('request successful')
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: error.response?.data || "Login failed",
            });
        }
    };
    return (
        <form action="">
          {error && <p>{error}</p>}
            <label htmlFor="username">
                Username :
                <input type="text" name="username" onChange={handleChange} required />
            </label>
            <label htmlFor="password">
                password :
                <input type="password" name="password" onChange={handleChange} required />
            </label>
            <button type="submit" onClick={handleLogin}>
                Login
            </button>
        </form>
    );
};

export default Login;
