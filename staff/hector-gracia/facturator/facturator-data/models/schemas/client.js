const {Schema}= require("mongoose")
const discount= require("./discount")

module.exports= new Schema({
    name: {
        type: String,
        required:true
    },
    establishment:{
        type: String
    },
    contactNumber:{
        type: Number
    },
    email:{
        type:String
    },
    direction:{
        type:String
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentInfo:{
        type:String
    },
    discounts:{
        type:[discount]
    }
})