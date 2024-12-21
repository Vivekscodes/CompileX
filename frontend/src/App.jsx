import React from 'react'
import CodeEditor from './components/CodeEditor/CodeEditor.jsx'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/editor/:id' element={<CodeEditor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
