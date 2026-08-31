// database/seed.js
require('dotenv').config(); // Load variables from your .env file
const db = require('../config/db'); // Import your existing database connection tool

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Insert Mock Users
    await db.query(`
      INSERT INTO users (name, email) VALUES
      ('Alice Khan', 'alice@example.com'),
      ('Bob Shah', 'bob@example.com')
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('✅ Mock users seeded.');

    // 2. Insert Mock Wallets
    await db.query(`
      INSERT INTO wallets (user_id, currency, balance, status) VALUES
      (1, 'PKR', 50000.00, 'active'),
      (2, 'PKR', 12000.50, 'active')
      ON CONFLICT (user_id) DO NOTHING;
    `);
    console.log('✅ Mock wallets seeded.');

    console.log('🏁 Seeding finished successfully!');
    process.exit(0); // Exit cleanly
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1); // Exit with error
  }
}

seedDatabase();