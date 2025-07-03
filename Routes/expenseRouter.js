const express = require('express');
const expenseController = require('./../Controllers/expenseController');

const router = express.Router();


router.route('/')
    .post(expenseController.createExpense);

module.exports = router;