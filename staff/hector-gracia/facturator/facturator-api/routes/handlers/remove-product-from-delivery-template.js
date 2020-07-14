const{removeProductFromDeliveryTemplate}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{templateId,productQuantityId}}= req
        await removeProductFromDeliveryTemplate(templateId,productQuantityId)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}