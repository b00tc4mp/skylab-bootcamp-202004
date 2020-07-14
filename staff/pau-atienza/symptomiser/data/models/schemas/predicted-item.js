const { Schema } = require('mongoose')

module.exports = new Schema({
    predictionCode: {
        type: String,
        required: true,
    },
    predictionName: {
        type: String,
        required: true,
    }
})