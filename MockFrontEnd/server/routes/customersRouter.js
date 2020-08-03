const express = require('express');
const customerInitiator = require('/Users/PolumboStudio/Documents/GitHub/mockAppWithHorus/customerInitiator.js')
const customersRouter = express.Router();

console.log('entering customersRouter')

customersRouter.post('/', customerInitiator.createCustomer, (req, res) => {
    console.log('create customer in customer Router')
    return res.status(200).json(res.locals.customers)
})

customersRouter.get('/', customerInitiator.getCustomer, (req, res) => {
    console.log('Getting customer in customer router')
    return res.status(200).json(res.locals.customers)
})

customersRouter.delete('/:custId', customerInitiator.deleteCustomer, (req, res) => {
    console.log('Entered deleteCustomer in customersRouter');
    return res.status(200);
})

module.exports = customersRouter;