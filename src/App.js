import React from "react";
import Navbar from "./Navbar";
import Connect4 from "./Connect4"; // Import the Connect4 component
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div id="about" className="section about">
        <div className="content">
          <div className="text-container">
            <h1 className="profile-name">Vivek Chandy</h1>
            <p className="profile-description">
              I'm a passionate developer interested in artificial intelligence, augmented reality, 
              and creating innovative solutions for the future.
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/vivek-chandy/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:vac23@duke.edu">Email</a>
            </div>
          </div>
          <img 
            src="https://via.placeholder.com/300" 
            alt="Vivek Chandy" 
            className="profile-photo"
          />
        </div>
      </div>

      <div id="projects" className="section projects">
        <h2>Projects</h2>
        <p className="projects-description">
          Here's a collection of some of my favorite projects:
        </p>
        <ul className="projects-list">
          <li>
            <strong>Chess AI:</strong> Built an AI that plays chess using the minimax algorithm.
          </li>
          <li>
            <strong>AR Zoo:</strong> Created an augmented reality zoo app to teach kids about animals.
          </li>
          <li>
            <strong>Interactive Data Viz:</strong> Made accessible visualizations for blind users.
          </li>
        </ul>
      </div>

      <div id="connect4" className="section connect4">
        <h2>Connect 4</h2>
        <Connect4 />
      </div>
    </div>
  );
}

export default App;
