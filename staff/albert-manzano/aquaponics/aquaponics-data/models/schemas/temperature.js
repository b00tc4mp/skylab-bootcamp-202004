const { Schema } = require('mongoose')
// require('aquaponics-commons/polyfills/numbers')

module.exports = new Schema({
    temperature: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
})

