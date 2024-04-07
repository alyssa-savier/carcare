import React, { useState } from "react";

function Login({ onLogin }) { // Define onLogin prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Backend integration
      const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.username); // Call onLogin with the username
        setAuthenticated(true);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('An error occurred while signing in');
    }
  };

  return (
    <div id="login-tab-content" className="tabcontent">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" className="input" placeholder="Email" value={email} onChange={handleEmailChange} required />
        <input type="password" className="input" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <input type="submit" className="button" value="Login" />
      </form>
    </div>
  );
}

export default Login;
