const express = require('express');
const customerInitiator = require('../../../customerInitiator.js')
const customersRouter = express.Router();

customersRouter.post('/', customerInitiator.createCustomer, (req, res) => {
    return res.status(200).json(res.locals.customers)
})

customersRouter.get('/:custId', customerInitiator.getCustomer, (req, res) => {
    return res.status(200).json(res.locals.customers)
})

customersRouter.delete('/:custId', customerInitiator.deleteCustomer, (req, res) => {
    return res.status(200);
})

module.exports = customersRouter;