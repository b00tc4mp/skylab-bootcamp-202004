const { Schema } = require('mongoose')

module.exports = new Schema({
    HPO_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})