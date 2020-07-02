const{addProductToDeliveryTemplate}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{templateId,productId, quantity}}= req
        const productQuantity={productId,quantity}
        await addProductToDeliveryTemplate(templateId,productQuantity)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}