import React, { useState } from 'react';
// import './App.css'; // Import your CSS file for styling

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className="app-bar">
        <div className="app-bar-content">
          <button type="button" className="menu-btn" onClick={toggleDrawer}>
            <i className="material-icons">menu</i>
          </button>
          <h1>Main Page Title</h1>
          <div className="app-bar-icons">
            <button type="button" className="icon-btn">
              <i className="material-icons">alarm</i>
            </button>
            <button type="button" className="icon-btn">
              <i className="material-icons">notifications</i>
            </button>
            <button type="button" className="icon-btn">
              <i className="material-icons">account_circle</i>
            </button>
          </div>
        </div>
      </div>
      <div className={`side-navbar ${isDrawerOpen ? 'open' : ''}`}>
        <div className="nav-item">Analytical View</div>
        <div className="nav-item">User Management</div>
      </div>
    </div>
  );
}

export default App;
