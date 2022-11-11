const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")
const JWT_SECRET = "fdsfdsdcdswere()fdsfds32423fscdsf343fdfdfdfxasdggg"

//============ Connection to database ================
const mongoURL = "mongodb+srv://lior:054132857@cluster0.u5khzof.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected to database");
})
.catch((e) => console.log(e));

require("./userDetails")
//Link to schema of userinfo
const User = mongoose.model("UserInfo")

//Store new user details in mongoDB from request of frontend
app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body;

    const encrypedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({email});
        if(oldUser) {
            return res.send({status:"User Exists"});
        }
        await User.create({
            fname,
            lname,
            email,
            password: encrypedPassword,
        });
        res.send({status: "ok"})
    } catch (error) {
        res.send({status: "error"})
    }
})

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        return res.json({ error: "User Not Found" });
    } 
    if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email:user.email} , JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token});
        } else {
            return res.json({ status: "error"});
        }
    }
    res.json({ status: "error", error: "Invalid Password"})
})

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user)

        const useremail = user.email;
        User.findOne({ email: useremail })
        .then((data) => {
            res.send({status: "ok", data: data})
        }).catch((error) => {
            res.send({status: "error"})
        })
    } catch (error) {}
})

// app.post("/post", async (req,res) => {
//     console.log(req.body)
//     const {data} = req.body;

//     try {
//         if(data == "lior"){
//             res.send({status:"ok"})
//         } else {
//             res.send({status: "User not found"});
//         }
//     } catch (error) {
//         res.send({ status: "Something went wrong try again" });
//     }
    
// })

// require("./userDetails");
// const User = mongoose.model("UserInfo");

// app.post("/register", async (req,res) => {
//     const { name, email, phone } = req.body
//     try {
//         await User.create({
//             uname: name,
//             email: email,
//             phoneNo: phone,
//         })
//         res.send({status: "ok"})
//     } catch (error) {
//         res.send({status: "error"})
//     }
// })


app.listen(5015, () => {
    console.log("Server Started");
})