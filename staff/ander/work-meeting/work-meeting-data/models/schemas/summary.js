const { Schema , Types: {ObjectId}} = require('mongoose')
const participant = require('./meeting')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },


    content: {
        type: String,
        required: true,
    },
    
    participants:[participant]
    
})  //marketing de la empresa noseke 