import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Quiz from "./pages/quiz";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";

import "./styles/App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const triggerRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <Router>
      <div className="app-layout">

        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="main-content">

          {/* Mobile Menu Button */}
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>

          <h1>Quiz Analytics Dashboard</h1>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/quiz" 
              element={<Quiz triggerRefresh={triggerRefresh} />} 
            />
            <Route 
              path="/results" 
              element={
                <Results 
                  refresh={refresh} 
                  triggerRefresh={triggerRefresh} 
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={<Analytics refresh={refresh} />} 
            />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;