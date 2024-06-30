const nodemailer = require('nodemailer');

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { name, email, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davidaniago@gmail.com',
      pass: 'qunm mlqo ahms lstd' // replace with your app-specific password
    }
  });

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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.status(200).send('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(error.toString());
  }
}

module.exports = handler;
