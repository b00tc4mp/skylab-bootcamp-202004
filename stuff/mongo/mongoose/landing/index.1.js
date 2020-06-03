const mongoose = require('mongoose')

// utils

function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

URL.isUrl = function (url) {
    try {
        new URL(url)

        return true
    } catch (error) {
        return false
    }
}

URL.validate = function (url) {
    if (!this.isUrl(url)) throw new Error(`${url} is not a url`)
}.bind(URL)

// data

const { Schema, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'invalid e-mail']
    },

    password: {
        type: String,
        required: true
    }
})

const User = model('User', user)

const product = new Schema({
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

    url: {
        type: String,
        validate: [URL.validate, 'invalid url']
    }
})

const Product = model('Product', product)

mongoose.connect('mongodb://localhost:27017/skylab', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => Promise.all([
        User.deleteMany(),
        Product.deleteMany()
    ]))
    .then(() => {
        return User.create({ name: 'Pepito', surname: 'Grillo', email: 'pepigri@mail.com', password: '123123123' })
    })
    .then(user => console.log(user))
    .then(() => {
        const jeans = new Product({
            name: 'Jeans',
            description: 'blah blah blah',
            price: 50,
            url: 'https://levis.com/501'
        })

        const socks = new Product({
            name: 'Super Socks',
            description: '4x4 all terrain metal socks',
            price: 20,
            url: 'https://super-socks.com'
        })

        return Product.insertMany([jeans, socks])
    })
    .then(products => console.log(products))
    .finally(mongoose.disconnect)