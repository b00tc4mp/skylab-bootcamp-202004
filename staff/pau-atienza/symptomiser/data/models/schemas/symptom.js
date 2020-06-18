const { Schema } = require('mongoose')

const navigation = require('./navigation')
const submittedTerm = require('./submitted-term')

module.exports = new Schema({
    navigation: {
        type: navigation,
        required: true
    },
    submittedTerm:  {
        type: submittedTerm,
        required: true
    },
    modifiers: [submittedTerm],
    comments: String
})