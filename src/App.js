import React, { useState } from "react"; // Import useState

import Signup from "./components/Signup";
import Login from "./components/Login";
import WelcomeScreen from "./components/WelcomeScreen";

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab content and add the "active" class to the clicked tab link
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setUsername(username);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setUsername("");
    setAuthenticated(false);
  };

  return (
    <div>
      <h1>Welcome to the Car Care</h1>
      {authenticated ? (
        <WelcomeScreen username={username} />
      ) : (
        <div className="form-wrap">
          <div className="tabs">
            <h3 className="signup-tab">
              <a className="tablink active" onClick={(e) => openTab(e, "signup-tab-content")}>
                Sign Up
              </a>
            </h3>
            <h3 className="login-tab">
              <a className="tablink" onClick={(e) => openTab(e, "login-tab-content")}>
                Login
              </a>
            </h3>
          </div>
          <div className="tabs-content">
            <Signup onLogin={handleLogin} />
            <Login onLogin={handleLogin} /> {/* Pass onLogin prop */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
