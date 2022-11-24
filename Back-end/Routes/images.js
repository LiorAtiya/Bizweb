const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const imageModel = require('../Models/image')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ 
    storage: storage, 
});

//Upload picture
router.post("/", upload.single("image"), (req, res) => {
    console.log(req.body.name);
    const saveImage = new imageModel({
        name: req.body.name,
        img: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: "image/jpeg",
        },
    })
    saveImage.save().then((res) => {
        console.log("image is saved")
    })
        .catch((err) => {
            console.log(err, "error is occur");
        })
        res.send(saveImage);
})

//get gallery of business
router.get('/:id', async (req,res) => {
    const allData = await imageModel.find({name: req.params.id});
    res.json(allData);
})

module.exports = router;