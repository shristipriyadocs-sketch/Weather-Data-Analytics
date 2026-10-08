import React from 'react';
import { NavLink } from 'react-router-dom';
import { UnitToggle } from './UnitToggle';

export const Navbar: React.FC = () => {
  const toggleDark = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">⛅</span>
        <span className="navbar-title">WeatherDash</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink
          to="/historical"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Historical
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Compare
        </NavLink>
      </div>
      <div className="navbar-controls">
        <UnitToggle />
        <button className="theme-btn" onClick={toggleDark} title="Toggle dark mode">
          ◑
        </button>
      </div>
    </nav>
  );
};
