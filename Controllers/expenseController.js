const User = require('../Models/UserModel');
const Expense = require('./../Models/ExpenseModel');



exports.createExpense = async (req, res, next) => {
    
    try {
        req.body.user = req.user._id    
        const newExpense = await Expense.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                expense: newExpense
            }
            
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
        
    }
};





exports.getExpense = async (req, res, next) => {
    
    try {
        const userId = req.user._id
        const expenses = await Expense.find({user : userId});

        res.status(201).json({
            status: 'success',
            results: expenses.length,
            data: {
                expenses
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};





exports.updateExpense = async (req, res, next) => {
    
    try {
        const updateExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});


        if(!updateExpense){
            return res.status(400).json({
                status: 'fail',
                message: `Expense with ID ${req.params.id} does not exist`
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                expense: updateExpense
            }
            
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};





exports.deleteExpense = async (req, res, next) => {
    
    try {
        
        const deletedexpense = User.findByIdAndDelete(req.params.id);

        if(!deletedexpense){
            return res.status(400).json({
                status: 'fail',
                message: `Expense with ID ${req.params.id} does not exist`
            })
        }

        res.status(204).json({
            status: "success",
            data: {
                expense: null
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};
