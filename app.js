const express = require('express');
const app = express();
const config = require('./config/app');
const routes = require('./routes');

app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
