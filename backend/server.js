const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const User = require('./User'); // Import the User model

// Use CORS and JSON body parser
app.use(cors());
app.use(express.json());

/*
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
*/

// API endpoint to calculate COE
app.post('/calculate-coe', async (req, res) => {
  try {
    const { category, year, month, round } = req.body;
    
    // Print out the parameters received from the frontend
    console.log('Category:', category);
    console.log('Year:', year);
    console.log('Month:', month);
    console.log('Round:', round);
    
    const coePrice = await getCOEPriceFromModel(category);
    res.json({ coePrice });
  } catch (error) {
    console.error("Error calculating COE:", error);
    res.status(500).send("An error occurred while calculating COE.");
  }
});


// Mock function to simulate fetching COE price from the ML model
const getCOEPriceFromModel = async (category) => {
  // Placeholder for ML model prediction logic
  return "16000"; // Return a mock COE price
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Replace 'your_database_uri' with your actual MongoDB database URI
mongoose.connect('mongodb://localhost/carcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other options as needed
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// API endpoint for user sign-in
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, username: user.username });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false });
  }
});

// API endpoint for user sign-up
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ success: true, username });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ success: false });
  }
});

// Other route handlers...