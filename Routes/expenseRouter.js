const express = require('express');
const expenseController = require('./../Controllers/expenseController');
const authController = require('./../Controllers/authController')

const router = express.Router();


router.route('/')
    .post(authController.protect ,expenseController.createExpense);

router.route('/')
    .get(authController.protect, expenseController.getExpense)

module.exports = router;