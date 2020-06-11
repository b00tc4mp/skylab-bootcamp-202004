const{removeProductFromDelivery}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{deliveryId,productQuantityId}}= req
        await removeProductFromDelivery(deliveryId,productQuantityId)
        return res.status(204).send()

    }catch(error){
        handleError(error,res)
    }
}