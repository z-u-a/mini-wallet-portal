const walletModel = require('../models/walletModel');

exports.getBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const balance = await walletModel.getBalance(userId);
    res.status(200).json({ success: true, data: { balance } });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

exports.addFunds = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const { idempotencyKey } = req.body;
    const newBalance = await walletModel.addFunds(idempotencyKey, userId, amount);
    res.status(200).json({ success: true, data: { balance: newBalance } });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

exports.transferFunds = async (req, res, next) => {
  try {
    const { sender, receiver, amount } = req.body;
    const { idempotencyKey } = req.body;
    const newBalance = await walletModel.transferFunds(idempotencyKey, sender, receiver, amount);
    res.status(200).json({ success: true, data: { balance: newBalance } });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};