const{addProductToDelivery}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{deliveryId,productId, quantity}}= req
        const productQuantity={product:productId,quantity}
        await addProductToDelivery(deliveryId,productQuantity)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}