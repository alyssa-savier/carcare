import React, { useState } from "react";

function WelcomeScreen({ username }) {
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track selected category
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedCategory(event.target.value); // Update selectedCategory state
  };

  // Function to handle sign out
  const handleSignOut = () => {
    // Call the onSignOut function passed from the parent component
    setLoggedInUser(null);
    setAuthenticated(false);
    window.location.href = '/'; // Redirect to the root URL
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

  return (
    <div className="welcome-screen">
      <h2 className="welcome-message">Welcome, {username}!</h2>
      <div className="instructions">
        <p>Please select a category to calculate the COE price:</p>
      </div>
      <div className="controls">
        <select className="dropdown" value={selectedCategory} onChange={handleOptionChange}>
          <option value="">Select COE Category</option>
          <option value="A">A (cars up to 1600cc)</option>
          <option value="B">B (cars above 1600cc)</option>
          <option value="C">C (goods vehicles and buses)</option>
          <option value="D">D (motorcycles)</option>
          <option value="E">E (open category)</option>
        </select>
        <button className="calculate-button" onClick={handleCalculateCOE} disabled={!selectedCategory}>
          Calculate
        </button>
      </div>
      <button className="signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default WelcomeScreen;
