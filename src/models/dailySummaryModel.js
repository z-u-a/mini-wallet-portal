class DailySummary {
  constructor({ date, totalCredits, totalDebits, transactionCount, activeWallets }) {
    this.date = date;
    this.totalCredits = totalCredits;
    this.totalDebits = totalDebits;
    this.transactionCount = transactionCount;
    this.activeWallets = activeWallets;
  }
}

module.exports = DailySummary;
