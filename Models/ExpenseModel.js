const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others']
    },

    date: {
        type: Date,
        default: Date.now,
        select: true
    },

    description: {
        type: String,
        trim: true
        // Reference to the User model
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Expense = new mongoose.model('Expense',expenseSchema);

module.exports = Expense;

