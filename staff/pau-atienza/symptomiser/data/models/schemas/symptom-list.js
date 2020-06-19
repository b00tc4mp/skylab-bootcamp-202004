const { Schema } = require('mongoose')
const { ObjectID } = require('mongodb')

module.exports = new Schema({
    symptomList: {
        type: [{
            type: ObjectID,
            ref: 'Symptom'
        }],
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
})