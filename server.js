const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const port = 4000;

app.get('/',(req, res) => {
    res.send('hello world');
})

const server = app.listen(port,()=>{
    console.log('server is running...');
});

