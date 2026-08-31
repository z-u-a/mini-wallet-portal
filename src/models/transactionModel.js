class Transaction {
  constructor({ id, walletId, type, amount, balanceBefore, balanceAfter, referenceId, description, createdAt }) {
    this.id = id;
    this.walletId = walletId;
    this.type = type;
    this.amount = amount;
    this.balanceBefore = balanceBefore;
    this.balanceAfter = balanceAfter;
    this.referenceId = referenceId;
    this.description = description;
    this.createdAt = createdAt;
  }
}

module.exports = Transaction;
