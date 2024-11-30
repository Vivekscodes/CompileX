import React from 'react'
import CodeEditor from './components/CodeEditor'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/editor/:id' element={<CodeEditor />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </Routes>
  )
}

export default App