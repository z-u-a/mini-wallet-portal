const { User } = require('../models');

exports.getAll = (req, res) => {
  const users = [
    new User({
      id: 1,
      name: 'John Doe',
      phone: '1234567890',
      email: 'john@example.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  ];

  res.json(users);
};
