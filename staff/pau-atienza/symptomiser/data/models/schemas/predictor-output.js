const { Schema } = require('mongoose')
const predictedItem = require('./predicted-item')

module.exports = new Schema({
    prediction: {
        type: [predictedItem],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})