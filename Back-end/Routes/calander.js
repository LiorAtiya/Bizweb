const router = require('express').Router();
const Calender = require('../Models/calender')
// const moment = require('moment')

//Create new event in the calender
router.post('/create-event', async (req, res) => {
    const { businessID, date, time,busy, name, phone, comments } = req.body;

    const appointment = {
        date: date,
        time: time,
        busy: busy,
        name: name,
        phone: phone,
        comments: comments,
    }

    const id = await Calender.findOne({ 'businessID': businessID });
    //Schema not found -> create schema of calneder of business
    if (!id) {
        const event = await Calender.create({
            // _id: businessID,
            businessID: businessID,
            dates: appointment,
        });
        res.send(event);
    } else {
        const afterUpdate = await Calender.findOneAndUpdate({ businessID: businessID} , {$push: { "dates": appointment }})
        res.send(afterUpdate);
    }
}
)

// //Get from mongoDB the data
// router.get('/get-events', async (req, res) => {
//     const events = await Event.find({
//         start: { $gte: moment(req.query.start).toDate() },
//         end: { $lte: moment(req.query.end).toDate() },
//     });
//     res.send(events)
// })

module.exports = router