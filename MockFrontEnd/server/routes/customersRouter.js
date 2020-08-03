const express = require('express');
const customerInitiator = require('/Users/PolumboStudio/Documents/GitHub/mockAppWithHorus/customerInitiator.js')
const customersRouter = express.Router();

customersRouter.post('/', customerInitiator.createCustomer, (req, res) => {
    console.log('create customer in customer Router')
    return res.status(200).json(res.locals.customers)
})

customersRouter.get('/', customerInitiator.getCustomer, (req, res) => {
    console.log('Getting customer in customer router')
    return res.status(200).json(res.locals.customers)
})

module.exports = customersRouter;