const router = require('express').Router();
const Business = require('../Models/businessDetails');
const Calender = require('../Models/calender');

//Add business
router.post('/add', async (req, res) => {
    const { category, name, description,
        city, address, phone, backgroundPicture } = req.body;

    try {
        //checks if the user already exist in database
        const oldName = await Business.findOne({ 'name': name });
        if (oldName) {
            return res.send({ status: "Business Exists" });
        }

        //create new business
        const business = await Business.create({
            category,
            name,
            description,
            gallery: [],
            reviews: [],
            city,
            address,
            phone,
            backgroundPicture
        });

        //create new calender for business
        const event = await Calender.create({
            // _id: businessID,
            businessID: business._id,
            dates: [],
            availableHours: [],
        });
        console.log(business);
        res.send(business);
    } catch (error) {
        res.send({ status: "error" })
    }
})

//Update info of business
router.put('/:id', async (req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            //NEED TO CHECK WHY ITS REPLACE BODY INSTEAD UPDATE
            const user = await Business.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json('business has been updated')
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can update only your business');
    }
})

//get one business
router.get("/:id", async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        //Not necessary
        // const {username,password,updatedAt, ...other} = user._doc
        res.status(200).json(business)

    } catch (err) {
        res.status(500).json(err)
    }
})

//get all business
router.get("/", async (req, res) => {
    try {
        const allBusiness = await Business.find({ type: "name" });
        res.status(200).json(allBusiness);
    } catch (err) {
        res.status(500).json(err)
    }
})


//Add new review
router.put("/:id/reviews", async (req, res) => {
    if (req.body.userID == req.params.id) {
        try {
            //Add new review
            await Business.findByIdAndUpdate({ _id: req.params.id }, { $push: { reviews: req.body.details } })
            console.log("Added new review");
            res.send("OK - 200 ");
        } catch (err) {
            res.status(500).json(err);
        }
    }
})

//Get all reviews of business
router.get("/:id/reviews", async (req, res) => {
    try {
        const user = await Business.findById(req.params.id);
        res.status(200).json(user.reviews)
        console.log("Get all reviews");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Add new picture to gallery
router.put("/:id/gallery", async (req, res) => {
    try {
        //Add new picture
        await Business.findByIdAndUpdate({ _id: req.params.id }, { $push: { gallery: req.body } })
        console.log("Added new picture");
        res.send("OK - 200 ");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get gallery of business
router.get("/:id/gallery", async (req, res) => {
    try {
        const user = await Business.findById(req.params.id);
        res.status(200).json(user.gallery)
        console.log("Get gallery");
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update calender
//Update location


module.exports = router;