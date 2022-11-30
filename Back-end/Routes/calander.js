const router = require('express').Router();
const Calender = require('../Models/calender')

//Create new event in the calender
router.post('/create-event', async (req, res) => {
    // const { businessID, date, time,busy, name, phone, comments } = req.body;

    //client made an appointment
    if (req.body.busy) {

        const appointment = {
            date: req.body.date,
            time: req.body.time,
            busy: req.body.busy,
            name: req.body.name,
            phone: req.body.phone,
            comments: req.body.comments,
        }

        const afterUpdate = await Calender.findOneAndUpdate({ businessID: req.body.businessID }, { $push: { "dates": appointment } })
        res.send(afterUpdate);


        await Calender.findOneAndUpdate({ businessID: req.body.businessID }, { $pull: { "availableHours": {date:req.body.date, time: req.body.time} } });


    } else { //admin add more available hours
        const afterUpdate = await Calender.findOneAndUpdate({ businessID: req.body.businessID }, { $push: { "availableHours": {date:req.body.date, time: req.body.time }}})
        res.send(afterUpdate);
    }
}
)

//Get all the events of business
router.post('/get-events', async (req, res) => {

    const events = await Calender.findOne({ businessID: req.body.businessID });
    res.send(events)
})

module.exports = router