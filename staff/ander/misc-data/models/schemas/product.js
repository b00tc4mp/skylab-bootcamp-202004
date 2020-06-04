const {Schema} = require('mongoose')

required('misc-commons/polyfills/URL')
module.exports = new Schema({
    name: { type: String, 
        required: true
    },
        
    description:{
        type: String,
        required: true
    },

    price: {
        tyope: Number,
        required:true
    },

    url: {
        type:String,
        validate: [URL.validate,'invalid url']
    }
})