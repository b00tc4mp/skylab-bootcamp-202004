const { Schema, Types: {ObjectId} } = require("mongoose");
const { MongoNetworkError } = require("mongodb");

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
        type: Date,
        default: Date.now
    },
    cookingDate: {
        type: Date
    },
    servedDate: {
        type: Date
    }
})