const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    
    sexo: {
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
    }
})

// Como se relaciona error de campo con frontent. Como crear un USE misc api. Cors.