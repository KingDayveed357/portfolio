const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express(); 
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davidaniago@gmail.com', // replace with your email
    pass: 'qunm mlqo ahms lstd'  // replace with your app-specific password
  }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, subject, body } = req.body;

  const mailOptions = {
    from: email,
    to: 'davidaniago@gmail.com',
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <header style="background-color: #4CAF50; padding: 10px; color: white; text-align: center;">
          <h1>Contact form</h1>
        </header>
        <main style="padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${body}</p>
        </main>
        <footer style="text-align: center; padding: 10px; font-size: 0.8em; color: #888;">
          <p>&copy; ${new Date().getFullYear()} aniago-david.vercel.app</p>
        </footer>
      </div>
    `
  };

  console.log('Attempting to send email:', mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).send('Email sent: ' + info.response);
    }
  });
});

// Fallback route for handling 404 errors for non-static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
