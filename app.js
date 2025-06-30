const express = require('express');
const authRouter = require('./Routes/authRouter')

let app = express();
app.use(express.json());


//routes
app.use('/api/v1/user', authRouter);

module.exports = app;