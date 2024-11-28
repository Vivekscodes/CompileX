import React from 'react'

const Login = () => {
  return (
    <form action="">
        <label htmlFor="username">
            Username :
            <input type="text" required/>
        </label>
        <label htmlFor="password">
            password :
            <input type="password" required/>
        </label>
        <button type="submit">Login</button>
    </form>
  )
}

export default Login