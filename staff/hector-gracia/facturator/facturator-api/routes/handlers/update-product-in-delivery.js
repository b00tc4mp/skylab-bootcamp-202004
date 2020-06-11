const{updateProductInDelivery}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{deliveryId,productQuantityId,productId,quantity}}= req
        const productQuantity={product:productId,quantity}
        await updateProductInDelivery(deliveryId,productQuantityId,productQuantity)
        return res.status(204).send()

    }catch(error){
        handleError(error,res)
    }
}