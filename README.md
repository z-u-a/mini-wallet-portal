# Mini Wallet Portal

Mini Wallet Portal is a small Node.js + Express application for managing wallet transactions, balances, and user activity. It uses PostgreSQL for persistence and provides a REST API for wallet operations such as creating users, tracking transactions, and checking wallet status.

## Features

- User wallet management
- Transaction tracking and balance updates
- PostgreSQL database integration
- Dockerized local database setup
- API health check and structured error handling

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- npm installed
- Docker Desktop or Docker Engine running
- PostgreSQL client tools are optional

## Setup

1. Install project dependencies:

   ```bash
   npm install
   ```

2. Create or update the environment file if needed:

   ```bash
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5433
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=mini_wallet
   NODE_ENV=development
   ```

3. Start the PostgreSQL database with Docker:

   ```bash
   docker-compose up -d
   ```

4. Run database migrations:

   ```bash
   npm run db:migrate:up
   ```

5. Seed initial data (optional but recommended):

   ```bash
   npm run db:seed
   ```

## Run the app

Start the server in development mode:

```bash
npm run dev
```

Or run the production-style start command:

```bash
npm start
```

The app will start on the port defined in your `.env` file, defaulting to `5000`.

## API health check

You can verify the server is running with:

```bash
curl http://localhost:5000/api/v1/health
```

Expected response:

```json
{
  "status": "active",
  "timestamp": "..."
}
```

## Useful commands

```bash
npm run dev
npm start
npm run db:migrate:up
npm run db:migrate:down
npm run db:seed
```

## Project structure

```text
.
├── config/
├── database/
├── migrations/
├── src/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── views/
├── .env
├── app.js
├── docker-compose.yml
├── package.json
├── server.js
└── README.md
```

## Notes

- The app expects PostgreSQL to be running on `localhost:5433` unless you change the environment variables.
- If you change the database configuration, keep the Docker Compose values and `.env` values in sync.
