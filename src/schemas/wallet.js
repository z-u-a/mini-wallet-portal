const joi = require('joi');

const addFundsSchema = joi.object({
  idempotencyKey: joi.string().uuid().required(),
  userId: joi.string().required(),
  amount: joi.number().positive().required()
});

const transferFundsSchema = joi.object({
    idempotencyKey: joi.string().required(),
    sender: joi.number().required(),
    receiver: joi.number().required(),
    amount: joi.number().positive().required()
})

module.exports = {
    addFundsSchema,
    transferFundsSchema
}

