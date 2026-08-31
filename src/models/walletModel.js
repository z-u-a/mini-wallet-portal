const db = require('../../config/db');
class Wallet {
  constructor({ id, userId, currency, balance, status, createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.currency = currency;
    this.balance = balance;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async getBalance(userId) {
    const query = 'SELECT balance FROM wallets WHERE user_id = $1';
    const { rows } = await db.query(query, [userId]);
    return rows[0];
  }

  static async addFunds(idempotencyKey, userId, amount) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN'); // Start a transaction
      const txResult = await client.query(`
        INSERT INTO transactions (idempotency_key, user_id, type, amount, status)
        VALUES ($1, $2, 'deposit', $3, 'completed')
        ON CONFLICT (idempotency_key) DO NOTHING
        RETURNING id; `, [idempotencyKey, userId, amount]
      );

      if (txResult.rows.length === 0) {
        throw new Error('Duplicate transaction detected. Funds not added.');
      }

      const query = 'UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING balance';

      const { rows } = await client.query(query, [amount, userId]);

      await client.query('COMMIT');

      return rows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(error.message || 'Failed to add funds');
    } finally {
      client.release();
    }

  }

  static async transferFunds(idempotencyKey, sender, receiver, amount) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      const txResult = await client.query(`
        SELECT balance from wallets WHERE user_id = $1 FOR UPDATE `, [sender]
      );

      if (txResult.rows.length === 0 || txResult.rows[0].balance < amount) {
        throw new Error('Insufficient funds or sender not found.');
      }

      const txInsert = await client.query(`
        INSERT INTO transactions (idempotency_key, user_id, type, amount, status)
        VALUES ($1, $2, 'transfer', $3, 'completed')
        ON CONFLICT (idempotency_key) DO NOTHING
        RETURNING id; `, [idempotencyKey, sender, amount]
      );

      if (txInsert.rows.length === 0) {
        throw new Error('Duplicate transaction detected. Funds not added.');
      }

      const debitQuery = 'UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 RETURNING balance';
      const creditQuery = 'UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING balance';

      const { rows: debitRows } = await client.query(debitQuery, [amount, sender]);
      const { rows: creditRows } = await client.query(creditQuery, [amount, receiver]);

      await client.query('COMMIT');

      return creditRows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(error.message || 'Failed to transfer funds');
    } finally {
      client.release();
    }
  }
}

module.exports = Wallet;
