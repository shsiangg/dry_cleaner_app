import React from 'react';
import Dashboard from './components/dashboard.js'
import Navbar from './components/navbar.js'
import './App.css'

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
