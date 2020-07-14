const{makeDeliveryFromTemplate}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{clientId,templateId}}= req
        await makeDeliveryFromTemplate(clientId,templateId)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}