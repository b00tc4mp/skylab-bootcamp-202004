const{retrieveDelivery}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{deliveryId}}= req
        const delivery = await retrieveDelivery(deliveryId)
        return res.status(200).send(delivery)

    }catch(error){
        handleError(error,res)
    }
}