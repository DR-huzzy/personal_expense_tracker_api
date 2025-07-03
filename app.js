const express = require('express');
const authRouter = require('./Routes/authRouter');
const expenseRouter = require('./Routes/expenseRouter');

let app = express();
app.use(express.json());


//routes
app.use('/api/v1/user', authRouter);
app.use('/api/v1/expenses', expenseRouter);


module.exports = app;