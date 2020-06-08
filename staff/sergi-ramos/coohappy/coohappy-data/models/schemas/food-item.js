const { Schema } = require('mongoose')


module.exports = new Schema({

    name: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    }

})