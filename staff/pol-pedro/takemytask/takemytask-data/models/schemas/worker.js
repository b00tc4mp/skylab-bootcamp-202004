const { utils: { Email } } = require('takemytask-commons')
const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const coments = require('./coments')
const rates = require('./rates')

module.exports = new Schema({
    role: {
        type: String,
        default: 'worker'
    },
    
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
        validate: [Email.validate, 'invalid e-mail']
    },

    password: {
        type: String,
        required: true
    },

    adress: {
        type: String,
        required: true
    },

    bankAcount : {
        type: String,
        require: true
    },

    description : {
        type: String,
        require: true
    },

    presentation : {
        type: String,
        require: true
    },

    pricingHour : {
        type: Number,
        require: true
    },

    jobCategories : {
        type: Array,
        require: true
    },

    workingDistance : {
        type: Number,
        require: true
    },

    ratesWorker : [rates],

    comentsWorker: [coments],

    chat: [{type: ObjectId, ref: 'chat'}],

    contracts : [{type: ObjectId, ref: 'contract'}]

})