const {Schema} = require('mongoose')

module.exports = new Schema ({
    ticker: {
        type: String,
        required: true
    }
})