
const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'active', timestamp: new Date() });
});

app.use('/api/v1', require('../src/routes'));

app.use((req, res, next) => {
  res.status(404).json({ 
    success: false, 
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found` 
  });
});

app.use(require('../src/middlewares/errorHandler'));

module.exports = app;
