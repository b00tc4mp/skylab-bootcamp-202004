const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Email } } = require('coohappy-commons')


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

    admin: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    foodListUser: [{
        foodItem: {
            type: ObjectId,
            ref: 'Food'
         
        },

        weight: {
            type: Number
        }
    }

    ],

    laundry: {

        date: {
            type: Date
        },

        hour: {
            type: String
        }

    },

    cohousingId: {
        type: ObjectId,
        ref: 'Cohousing'
    }
})
