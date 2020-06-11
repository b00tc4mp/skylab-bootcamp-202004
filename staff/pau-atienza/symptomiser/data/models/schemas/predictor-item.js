const { Schema } = require('mongoose')

module.exports = new Schema({
    "prediction-code": {
        type: String,
        required: true,
    },
    "prediction-name": {
        type: String,
        required: true,
    },

})