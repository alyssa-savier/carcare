import React, { useState } from "react";

function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle form submission for sign up
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setLoggedInUser(data.username);
        setAuthenticated(true);
        setShowSignUpForm(false);
        setUsername('');
        setEmail('');
        setPassword('');
        onLogin(data.username);
      } else {
        alert('Sign-up failed. Please try again.');
      }
      console.log(
        `Submitted username: ${username}, password: ${password}, email: ${email}`
      );
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred while signing up');
    }
  };

  return (
    <div id="signup-tab-content" class="tabcontent" style={{ display: "block" }}>
      <form class="signup-form" action="" method="post" onSubmit={handleSignUpSubmit} >
        <input type="email" class="input" id="user_email" autocomplete="off" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="text" class="input" id="user_name" autocomplete="off" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" class="input" id="user_pass" autocomplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <input type="submit" class="button" value="Sign Up" />
      </form>
      <div class="help-text">
        <p>By signing up, you agree to our Terms of service</p>
      </div>
    </div>
  );
}

export default Signup;
