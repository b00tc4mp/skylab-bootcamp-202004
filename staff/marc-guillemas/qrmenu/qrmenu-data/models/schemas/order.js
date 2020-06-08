const { model, Schema, Types: {ObjectId} } = require("mongoose");


model.exports = new Schema ({
    table: {
        type: Number,
        required: true
    },

    dishes: [{
        type: ObjectId,
        ref: "Dish"
    }],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["ordered", "served", "payed"],
        default: "ordered"
    },

    date: {
        type: Date,
        required: true
    }
})