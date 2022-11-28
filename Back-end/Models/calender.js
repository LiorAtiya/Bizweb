const mongoose = require('mongoose')

const CalenderSchema = mongoose.Schema({
    businessID: String,
    dates: Array,
})

module.exports = mongoose.model("Calender", CalenderSchema);