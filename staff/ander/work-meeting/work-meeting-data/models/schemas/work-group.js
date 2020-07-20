const { Schema, Types: {ObjectId} } = require('mongoose')
const petition = require('./petition')
const department = require('./department')

module.exports = new Schema({
    name:{
        type: String,
        required: true
    },
    petitions: [petition],

    creator: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    members: [{
        type: ObjectId,
        ref: 'User'}],

    departments:[department]

})



