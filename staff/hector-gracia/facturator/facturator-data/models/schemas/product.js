const{Schema}= require("mongoose")

module.exports= new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String
    },
    price:{
        type: Number,
        required: true,
    },
    tax:{
        type: Number,
        default:0
    },
    alergens:{
        type:[String]
    }
})