const express = require('express');
const customerInitiator = require('/Users/PolumboStudio/Documents/GitHub/mockAppWithHorus/customerInitiator.js')
const router = express.Router();

router.post('/customers', customerInitiator.createCustomer, (req, res) => {
    console.log('create customer in customer Router')
    return res.status(200).json(res.locals.user)
})