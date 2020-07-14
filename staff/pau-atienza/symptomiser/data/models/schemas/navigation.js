const { Schema } = require('mongoose')

const predictorInput = require('./predictor-input')
const predictorOutput = require('./predictor-output')
const navigationItem = require('./navigation-item')

module.exports = new Schema({
    
    predictorInput: {
        type: predictorInput,
        required: true
    },
    predictorOutput: {
        type: predictorOutput,
        required: true
    },
    clicks: {
        type: [navigationItem],
        required: true
    },
    serverResponseTime: {
        type: Number,
        required: true
    },
    userNavigationTime: {
        type: Number,
        required: true
    }
})