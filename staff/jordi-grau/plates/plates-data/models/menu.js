const { mongoose } = require('mongoose')
const plate = requiere('./plate')

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
