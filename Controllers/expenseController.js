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
        const { timeframe, start, end } = req.query;

        const userId = req.user._id
        const query = {user : userId}
        

        // Apply filters if provided
        if (timeframe) {
            const now = new Date();
            let startDate;

            switch (timeframe) {
                case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
                case 'month':
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
                case '3months':
                startDate = new Date(now.setMonth(now.getMonth() - 3));
                break;
                default:
                return res.status(400).json({ error: 'Invalid timeframe' });
            }
            query.date = { $gte: startDate };
        }


        // Custom date range (overrides timeframe)
        if (start && end) {
            query.date = {
                $gte: new Date(start),
                $lte: new Date(end)
            };
        }


        const expenses = await Expense.find(query);

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


/* exports.getExpenses = async (req, res) => {
  try {
    const { timeframe, start, end } = req.query;
    const query = { user: req.userId };

    // Apply filters if provided
    if (timeframe) {
      const now = new Date();
      let startDate;

      switch (timeframe) {
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case '3months':
          startDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        default:
          return res.status(400).json({ error: 'Invalid timeframe' });
      }
      query.date = { $gte: startDate };
    }

    // Custom date range (overrides timeframe)
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    const expenses = await Expense.find(query);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; */



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
