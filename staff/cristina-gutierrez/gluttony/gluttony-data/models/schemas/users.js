const { Schema } = require("mongoose")
const { utils: { Email } } = require("gluttony-commons")

module.exports = new Schema({
    _id: {
        type: String,
        alias: "id"
    },
    
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, "invalid e-mail"]
    },

    password: {
        type: String,
        required: true
    },

    favouriteStores: [{
        type: String,
        ref: "Stores"
    }]
})