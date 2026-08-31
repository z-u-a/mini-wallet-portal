require('dotenv').config(); 
const app = require('./config/app');
const db = require('./config/db');

const port = process.env.PORT || 5000;

db.pool.connect()
  .then(client => {
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit the process with an error code
});