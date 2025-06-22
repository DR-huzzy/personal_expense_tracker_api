const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const port = process.env.PORT || 4000;



/* app.get('/',(req, res) => {
    res.send('hello world');
}) */

mongoose.connect(
    process.env.CONN_STR
).then((conn)=>{
    console.log('DB connected successfully');
}).catch(err => {
    console.log('some error has occured ');
});

const server = app.listen(port,()=>{
    console.log('server is running...');
});


/// DONT FORGET TO RESEARCH ON GITIGNORE FOR THE CONFIG.ENV