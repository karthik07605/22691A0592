const express = require('express');
const cors = require('cors'); // Add this line
const app = express();

app.use(express.json());
app.use(cors()); // Add this line to enable CORS for all origins

app.post('/evaluation-service/logs', (req, res) => {
  console.log('Received log:', req.body);
  res.json({ success: true, message: 'Log received', data: req.body });
});

app.post('/url-shortener', (req, res) => {
  console.log('Received URL shortening request:', req.body);
  res.json({ success: true, shortUrls: req.body.map(url => ({ ...url, shortcode: Math.random().toString(36).substr(2, 6) })) });
});

app.listen(3001, () => console.log('Mock server running on port 3001'));