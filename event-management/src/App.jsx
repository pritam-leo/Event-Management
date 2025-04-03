import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Decorating from './pages/Decorating';
import Catering from './pages/Catering';

import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/protectedroute'; 

function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/me', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  fetchUser();
}, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/decorating" 
              element={
                <ProtectedRoute user={user}>
                  <Decorating />
                </ProtectedRoute>
              } 
            />
              
             <Route 
              path="/catering" 
              element={
                <ProtectedRoute user={user}>
                  <Catering />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;