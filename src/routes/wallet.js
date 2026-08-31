const express = require('express');
const router = express.Router();
const wallet = require('../controllers/wallet');
const { addFundsSchema, transferFundsSchema } = require('../schemas/');
const validate = require('../middlewares/schemaValidator');

router.get('/balance/:userId', wallet.getBalance);
router.put('/deposit/:userId', validate(addFundsSchema), wallet.addFunds);
router.post('/transfer', validate(transferFundsSchema), wallet.transferFunds);

module.exports = router;
