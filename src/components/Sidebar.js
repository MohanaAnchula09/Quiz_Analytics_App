import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      <h2>Dashboard</h2>

      <ul>
        <li>
          <NavLink 
            to="/" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/quiz" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Quiz
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/results" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Results
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/analytics" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Analytics
          </NavLink>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;