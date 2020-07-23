const { Schema } = require("mongoose")

module.exports = new Schema({
    _id: {
        type: String,
        alias: "id"
    },
    
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    coordinates: {
        type: {latitude: Number, longitude: Number},
        unique: true,
        required: true
    },

    thumbnail: {
        type: String,
        default: "https://github.com/crispine/skylab-bootcamp-202004/blob/gluttony-develop/staff/cristina-gutierrez/gluttony/gluttony-app/assets/images/logo-with-color-and-without-words-version%20png.png?raw=true"
    }
})