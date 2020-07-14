const{makeEmptyDelivery}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{clientId}}= req
        await makeEmptyDelivery(clientId)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}