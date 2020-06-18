const { Schema } = require('mongoose')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },

    description: {  
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    // qty: {
    //     type: Number,
    //     required: true
    // },
    
    tags: [{
        type: String,
        required: true
    }]
})