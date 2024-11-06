import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Home from './components/Home'
import Chat from '../src/components/Chat'

function App() {

  return (
    <>
    <Router>
    <Routes> 
     
     <Route path="/" element={<Home />} />
      {/* auth routes */}
      <Route path="/auth/Signup" element={<Signup /> } />
      <Route path="/auth/Login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
     </Routes>
    </Router>
   
    </>
  )
}

export default App
