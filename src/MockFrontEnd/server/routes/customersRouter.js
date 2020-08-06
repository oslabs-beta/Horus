const express = require('express');
const customersClient = require('../../../customers/customersClient.js');

const customersRouter = express.Router();

customersRouter.post('/', customersClient.createCustomer, (req, res) => {
    return res.status(200).json(res.locals.customers)
});

customersRouter.get('/:custId', customersClient.getCustomer, (req, res) => {
    return res.status(200).json(res.locals.customers)
});

customersRouter.delete('/:custId', customersClient.deleteCustomer, (req, res) => {
    return res.status(200);
});

module.exports = customersRouter;
