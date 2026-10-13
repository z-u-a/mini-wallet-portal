class User {
  constructor({ id, name, phone, email, status, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
