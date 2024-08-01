import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Features from './components/Features';
import Demo from './components/Demo';
import AIConversation from './components/AIConversation';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Features />
              <Demo />
            </>
          } />
          <Route path="/conversation" element={<AIConversation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;