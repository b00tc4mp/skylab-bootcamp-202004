const { Schema } = require("mongoose")

module.exports = new Schema({
    _id: {
        type: String,
        alias: "id"
    },

    text: {
        type: String,
        required:true
    },

    creationDate: {
        type: Date,
        required: true
    },

    userId: {
        type: String,
        ref: "Users",
        require: true
    },

    storeId: {
        type: String,
        ref: "Stores",
        required: true
    }
})