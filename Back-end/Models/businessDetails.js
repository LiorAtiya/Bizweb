const mongoose = require("mongoose");

const BusinessDetailsSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
        default: ""
    },
    name: {
        type: String,
        require: true,
        default: ""
    },
    description: {
        type: String,
        require: true,
        default: ""
    },
    gallery: Array,
    reviews: Array,
    calender: {
        type: String,
        require: true,
        default: ""
    },
    location: {
        type: String,
        require: true,
        default: ""
    },
},
    { timestamps: true }
);



module.exports = mongoose.model("BusinessDetails", BusinessDetailsSchema);