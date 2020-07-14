const { Schema } = require('mongoose')
const { utils: { Email } } = require('qrmenu-commons')

module.exports = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate,'invalid e-mail']
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