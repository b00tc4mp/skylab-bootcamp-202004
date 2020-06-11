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

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    foodList: [{
        name: {
            type: String,
            require: true
        },
        weight: {
            type: Number,
            require: true
        }
    }],  

    cohousing: {
        type: ObjectId,
        ref: 'Cohousing'
    }
})
