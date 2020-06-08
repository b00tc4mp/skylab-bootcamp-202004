const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


module.exports = new Schema({

    name: {
        type: String,
        required: true
    },

    adress: {

        street: {
            type: String,
            required: true
        },
    
        number: {
            type: Number,
            required: true
        },
    
        city: {
            type: String,
            required: true
        },
        require: true
    },    

    members: [{
        type: ObjectId,
        ref: 'User',
        required: true
    }],

    accesCode: {
        type: String,
        required: true
    },

    foodList: [{
        foodItem: {

            type: ObjectId,
            ref: 'FoodItem',
            required: true

        },

        weight: {
            type: Number,
            required: true
        }
    }],

    messages: [message]
})


