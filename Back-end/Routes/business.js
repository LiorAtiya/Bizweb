const router = require('express').Router();
const Business = require('../Models/businessDetails');

//Add business
router.post('/add', async (req, res) => {
    const { category, name, description,
        gallery, reviews, calender, location } = req.body;

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
                        gallery,
                        reviews,
                        calender,
                        location,
                    });
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


//Add picture to gallery
router.put("/:id/gallery", async (req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            //Add new picture
            await Business.updateOne({ $push: { gallery: req.body } })
        } catch (err) {
            res.status(500).json(err);
        }
    } else {

    }
})



//Update reviews
//Update calender
//Update location


module.exports = router;