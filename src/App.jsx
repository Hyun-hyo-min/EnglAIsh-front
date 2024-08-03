import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Features from './components/Features';
import AIConversation from './components/AIConversation';
import ProgressAnalysis from './components/ProgressAnalysis';
import Footer from './components/Footer';
import AuthCallback from './components/AuthCallback';
import Cookies from 'js-cookie';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLoginSuccess = (token) => {
    Cookies.set('token', token);
    setUser({ token });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={!!user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Features />} />
          <Route 
            path="/conversation" 
            element={user ? <AIConversation user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/progress" 
            element={user ? <ProgressAnalysis user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/conversation" /> : <Login />} 
          />
          <Route 
            path="/auth-callback" 
            element={<AuthCallback onLoginSuccess={handleLoginSuccess} />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;