const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sendEmailHandler = require('./api/send-email');

const app = express(); 
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/api/send-email', sendEmailHandler);

// Fallback route for handling 404 errors for non-static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
