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
        type: Boolean,
        required: true
    },

    foodListUser: [{
        foodItem: {
            type: ObjectId,
            ref: 'Food',
            required: true
        },

        weight: {
            type: Number,
            required: true
        }
    }],

    laundry: {

        date: {
            type: Date,
            required: true
        },

        hour: {
            type: String,
            required: true
        }
    },

    cohousingId: {
        type: ObjectId,
        ref: 'Cohousing'
    }
})
