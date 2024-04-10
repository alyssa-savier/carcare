import React, { useState } from "react";

function WelcomeScreen({ username }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [round, setRound] = useState("");

  const handleOptionChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleRoundChange = (event) => {
    setRound(event.target.value);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    // Call the onSignOut function passed from the parent component
    setLoggedInUser(null);
    setAuthenticated(false);
    window.location.href = '/'; // Redirect to the root URL
  };  

  const handleCalculateCOE = async () => {
    try {
      const response = await fetch('http://localhost:3001/calculate-coe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          year: year,
          month: month,
          round: round,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.coePrice);
      } else {
        // Handle HTTP error response
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
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
          <option value="0">A (cars up to 1600cc)</option>
          <option value="1">B (cars above 1600cc)</option>
          <option value="2">C (goods vehicles and buses)</option>
          <option value="3">D (motorcycles)</option>
          <option value="4">E (open category)</option>
        </select>
        <input type="number" className="input" id="year" placeholder="Year (YYYY)" min="1900" max="2100" value={year} onChange={handleYearChange} required autoComplete="off" />
        <input type="number" className="input" id="month" placeholder="Month (1-12)" min="1" max="12" value={month} onChange={handleMonthChange} required autoComplete="off" />
        <input type="number" className="input" id="round" placeholder="Round (1-2)" min="1" max="2" value={round} onChange={handleRoundChange} required autoComplete="off" />
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
