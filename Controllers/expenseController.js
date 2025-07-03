const Expense = require('./../Models/ExpenseModel');



exports.createExpense = async (req, res, next) => {
    
    try {
        const newExpense = await Expense.create(req.body);

        res.status(201).json({
            status: 'success',
            expense: newExpense
        })

    } catch (err) {
        console.log(err.message);
    }
};





exports.getExpense = async (req, res, next) => {
    
    try {
        
    } catch (err) {
        console.log(err.message);
    }
};





exports.updateExpense = async (req, res, next) => {
    
    try {
        
    } catch (err) {
        console.log(err.message);
    }
};





exports.deleteExpense = async (req, res, next) => {
    
    try {
        
    } catch (err) {
        console.log(err.message);
    }
};
