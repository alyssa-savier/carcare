const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const PORT = process.env.PORT || 3001;

// Use CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Mock function to simulate fetching COE price from the ML model
const getCOEPriceFromModel = async (category) => {
  // Placeholder for ML model prediction logic
  return "15000"; // Return a mock COE price
};

// API endpoint for user sign-up
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Append new user to users.csv file
  const csvWriterInstance = csvWriter({
    path: 'users.csv',
    header: [
      { id: 'username', title: 'Username' },
      { id: 'email', title: 'Email' },
      { id: 'password', title: 'Password' },
    ],
    append: true,
  });

  try {
    await csvWriterInstance.writeRecords([{ username, email, password }]);
    await fs.promises.appendFile('users.csv', '\n'); // Append a newline character
    res.json({ success: true, username });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ success: false });
  }
});


// API endpoint to calculate COE
app.post('/calculate-coe', async (req, res) => {
  try {
    const category = req.body.category;
    const coePrice = await getCOEPriceFromModel(category);
    res.json({ coePrice });
  } catch (error) {
    console.error("Error calculating COE:", error);
    res.status(500).send("An error occurred while calculating COE.");
  }
});

// API endpoint for user sign-in
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Read users from CSV file
  const users = [];
  fs.createReadStream('users.csv')
    .pipe(csvParser({ headers: ['username', 'email', 'password'] })) // Specify column headers
    .on('data', (row) => {
      users.push(row);
    })
    .on('end', () => {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        res.json({ success: true, username: user.username });
      } else {
        res.json({ success: false });
      }
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
