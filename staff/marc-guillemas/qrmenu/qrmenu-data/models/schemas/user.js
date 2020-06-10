const { Schema } = require('mongoose')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        type: String,
        enum: ["owner", "chef", "waiter"]
    }
})