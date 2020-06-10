const { Schema } = require('mongoose')

const plate = require('./plate')

module.exports = new Schema ({
    plates:{
        type:[plate],
        required: true
    },
    isDaily: {
        type: Boolean, 
        default: false
    },
    date:{
        type: Date
    }
})
