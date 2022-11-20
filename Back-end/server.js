const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./Routes/users')
const authRoute = require('./Routes/auth')
const businessRoute = require('./Routes/business')
dotenv.config();

const cors = require("cors");
const bodyParser = require('body-parser')
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken")
// const JWT_SECRET = "fdsfdsdcdswere()fdsfds32423fscdsf343fdfdfdfxasdggg"

const app = express();
app.use(cors());
app.use(bodyParser.json())

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


app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/business', businessRoute);

//For calender
// app.use('/api/calender', require('./Routes/CalanderController'))

// require("./Models/userDetails")
//Link to schema of userinfo
// const User = mongoose.model("UserInfo")

// //Store new user details in mongoDB from request of frontend
// app.post("/register", async (req, res) => {
//     const { fname, lname, email, password } = req.body;

//     const encrypedPassword = await bcrypt.hash(password, 10);

//     try {
//         const oldUser = await User.findOne({ email });
//         if (oldUser) {
//             return res.send({ status: "User Exists" });
//         }
//         await User.create({
//             fname,
//             lname,
//             email,
//             password: encrypedPassword,
//         });
//         res.send({ status: "ok" })
//     } catch (error) {
//         res.send({ status: "error" })
//     }
// })

// app.post("/login-user", async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.json({ error: "User Not Found" });
//     }
//     if (await bcrypt.compare(password, user.password)) {
//         const token = jwt.sign({ email: user.email }, JWT_SECRET);

//         if (res.status(201)) {
//             return res.json({ status: "ok", data: token });
//         } else {
//             return res.json({ status: "error" });
//         }
//     }
//     res.json({ status: "error", error: "Invalid Password" })
// })

// app.post("/userData", async (req, res) => {
//     const { token } = req.body;
//     try {
//         const user = jwt.verify(token, JWT_SECRET);
//         console.log(user)

//         const useremail = user.email;
//         User.findOne({ email: useremail })
//             .then((data) => {
//                 res.send({ status: "ok", data: data })
//             }).catch((error) => {
//                 res.send({ status: "error" })
//             })
//     } catch (error) { }
// })

app.listen(5015, () => {
    console.log("Server Started");
})