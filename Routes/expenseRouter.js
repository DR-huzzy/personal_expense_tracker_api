const express = require('express');
const expenseController = require('./../Controllers/expenseController');
const authController = require('./../Controllers/authController')

const router = express.Router();


router.route('/')
    .post(authController.protect ,expenseController.createExpense)
    .get(authController.protect, expenseController.getExpense)

router.route('/:id')
    .patch(authController.protect, expenseController.updateExpense)
    .delete(authController.protect, expenseController.deleteExpense)

module.exports = router;