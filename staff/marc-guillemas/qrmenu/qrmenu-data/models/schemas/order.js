const { model, Schema, Types: {ObjectId} } = require("mongoose");


model.exports = new Schema ({
    table: {
        type: Number,
        required: true
    },

    dishStatus: [dishStatus],

    total: {
        type: Number,
        required: true
    },

    payed: {
        type: Boolean, 
        default: false
    },

    date: {
        type: Date,
        required: true
    }
})