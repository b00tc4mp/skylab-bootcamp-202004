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
    
    role: {
        type: String,
        enum: ["owner", "chef", "waiter"]
    },
    password: {
        type: String,
        required: true
    }

})