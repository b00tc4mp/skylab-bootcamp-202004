const { Schema } = require('mongoose')
const { Email } = require('qrmenu-commons')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate: [Email.validate,'invalid e-mail']
    // },

    password: {
        type: String,
        required: true
    }
})