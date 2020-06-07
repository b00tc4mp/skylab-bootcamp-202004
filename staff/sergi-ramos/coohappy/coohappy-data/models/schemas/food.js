const { Schema } = require('mongoose')


module.exports = new Schema({

    name: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    }

})