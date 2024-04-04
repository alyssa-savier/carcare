import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [coePrice, setCoePrice] = useState(null);

  // Function to handle sign-in button click
  const handleSignInClick = () => {
    setShowSignInForm(true);
    setShowSignUpForm(false);
  };

  // Function to handle sign-up button click
  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowSignInForm(false);
  };

  // Function to handle form submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
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
        setLoggedInUser(data.username);
        setAuthenticated(true);
        setShowSignInForm(false);
        setEmail('');
        setPassword('');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('An error occurred while signing in');
    }
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
      } else {
        alert('Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred while signing up');
    }
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    setLoggedInUser(null);
    setAuthenticated(false);
  };

  // Function to handle COE calculation
  const handleCalculateCOE = async () => {
    try {
      const response = await fetch('http://localhost:3001/calculate-coe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: selectedCategory }),
      });
      const data = await response.json();
      alert(data.coePrice);
    } catch (error) {
      console.error('Error fetching COE price:', error);
    }
  };

  useEffect(() => {
    // Fetch username or perform any other necessary actions after sign-in
  }, [loggedInUser]);

  return (
    <div className="App">
      <header className="App-header">
        {authenticated ? (
          <div>
            <p>Welcome {loggedInUser}!</p>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        ) : (
          <div>
            <button onClick={handleSignInClick}>Sign In</button>
            <button onClick={handleSignUpClick}>Sign Up</button>
            {showSignInForm && (
              <form onSubmit={handleSignInSubmit}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
              </form>
            )}
            {showSignUpForm && (
              <form onSubmit={handleSignUpSubmit}>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
              </form>
            )}
          </div>
        )}
        {authenticated && (
          <div className="content">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ marginRight: '10px' }}
            >
              <option value="">Select COE Category</option>
              <option value="A">A (cars up to 1600cc)</option>
              <option value="B">B (cars above 1600cc)</option>
              <option value="C">C (goods vehicles and buses)</option>
              <option value="D">D (motorcycles)</option>
              <option value="E">E (open category)</option>
            </select>
            <button onClick={handleCalculateCOE} disabled={!selectedCategory}>
              Calculate COE
            </button>
          </div>
        )}
        {coePrice !== null && (
          <div className="result">
            <p>The COE Price is: {coePrice}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
