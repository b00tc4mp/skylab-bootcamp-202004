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

const { Schema, model, SchemaTypes: { ObjectId } } = mongoose

const productQuantity = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
})

const ProductQuantity = model('ProductQuantity', productQuantity)

const order = new Schema({
    products: {
        type: [productQuantity],

        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
})

const Order = model('Order', order)

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
    },

    nickname: String,

    cart: [productQuantity],

    orders: [order]
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
        //return User.create({ name: 'Pepito', surname: 'Grillo', email: 'pepigri@mail.com', password: '123123123' })

        // OR

        const user = new User({ name: 'Pepito', surname: 'Grillo', email: 'pepigri@mail.com', password: '123123123' })

        return user.save()
    })
    .then(user => {
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
            .then(([jeans, socks]) => {
                user.cart.push(new ProductQuantity({
                    product: jeans._id,
                    quantity: 2
                }))

                user.cart.push(new ProductQuantity({
                    product: socks._id,
                    quantity: 3
                }))

                return user.save()
            })
            // .then(() => {
            //     const userId = user.id

            //     return User.findById(userId)
            // })
            // .then(user => {
            //     user.name = 'Fula'

            //     return user.save()
            // })
            .then(() => {
                return User.findById(user.id).populate('cart.product')
            })
            .then(user => {
                debugger

                const amount = user.cart.reduce((accum, item) => accum + item.product.price * item.quantity, 0)

                user.orders.push(new Order({
                    products: user.cart,
                    amount,
                    date: new Date
                }))

                user.cart = []

                return user.save()
            })
    })
    .finally(mongoose.disconnect)