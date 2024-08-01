import React from 'react';
import Header from './Header';
import Features from './Features';
import Demo from './Demo';
import Footer from './Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Features />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}

export default App;