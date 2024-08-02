import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Features from './components/Features';
import AIConversation from './components/AIConversation';
import Footer from './components/Footer';
import AuthCallback from './components/AuthCallback';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (token) => {
    // 토큰을 사용하여 사용자 정보를 설정하거나 추가적인 사용자 정보를 가져올 수 있습니다.
    setUser({ token });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
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