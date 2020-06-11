const { Schema } = require('mongoose')
const { PredictionItem } = require('../')

module.exports = new Schema({
    prediction: {
        type: [PredictionItem],
        required: true,
    },

})