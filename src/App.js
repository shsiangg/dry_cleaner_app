import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Dashboard from './components/dashboard.js'
import Navbar from './components/navbar.js'

function App() {

  return (    
    <div className="container">
      <Navbar />
      <div className="dashboard-container">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
