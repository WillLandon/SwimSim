const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 1. Security Middleware
app.use(helmet());

// 2. Logging Middleware
app.use(morgan('combined'));

// 3. Body Parsing Middleware (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Static File Middleware (serves your HTML, CSS, JS)
app.use(express.static('public'));

// 5. API Route with custom logic
app.post('/api/contact', (req, res) => {
  const { name, email } = req.body;
  // Here you would typically save to a database
  console.log(`Received contact from: ${name} (${email})`);
  res.json({ success: true, message: 'Thank you for contacting us!' });
});

// 6. Catch-all handler: send back index.html for SPA routing (if you use it)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Website backend listening on port ${port}`);
});