const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Email } } = require('books-commons')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, 'invalid e-mail']
    },

    password: {
        type: String,
        required: true
    },
        
    requestedBooks: [{
        type: ObjectId,
        ref: 'Book'
    }],

    following :[{
        type:ObjectId,
        ref:'User'
    }],
    followers :[{
        type:ObjectId,
        ref:'User'
    }],

    score:[{
        user: {
            type: ObjectId,
            ref:'Users',
        },
        points:{
            type:Number,
        }
    }],

    sendMessages:[{type: ObjectId, ref: 'Message'}],

    receivedMessages:[{type: ObjectId, ref: 'Message'}],

    avgScore:{
        type:Number
    },

    gpsCoordinates:{
        latitude: {
            type:Number
        },
        longitude:{
            type:Number
        }
    }
})