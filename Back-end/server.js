const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const bodyParser = require('body-parser')
const userRoute = require('./Routes/users')
const authRoute = require('./Routes/auth')
const businessRoute = require('./Routes/business')
const calenderRoute = require('./Routes/calander')

// const imageRoute = require('./Routes/images')
dotenv.config();

const app = express();

//============ Connection to database ================    
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));


//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors());
app.use(bodyParser.json())

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/business', businessRoute);
app.use('/api/calender',calenderRoute);

// app.use('/api/gallery', imageRoute);

app.listen(5015, () => {
    console.log("Server Started");
})