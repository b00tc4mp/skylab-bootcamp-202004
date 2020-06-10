const { Schema, Types: {ObjectId} } = require("mongoose");

module.exports = new Schema ({
    dish: {
        type: ObjectId,
        ref: "Dish"
    },
    status: {
        type: String,
        enum: ["ordered", /* "cooking", */ "served"],
        default: "ordered"
    },
    orderedDate: {
        type: Date
    },
    cookingDate: {
        type: Date
    },
    servedDate: {
        type: Date
    }
})