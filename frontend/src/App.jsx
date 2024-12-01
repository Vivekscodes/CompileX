import React from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import CodeEditor from './components/CodeEditor'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/code' element={<CodeEditor />} />
        <Route path='/share' element={<CodeEditor />} />
      </Routes>
    </div>
  )
}

export default App
