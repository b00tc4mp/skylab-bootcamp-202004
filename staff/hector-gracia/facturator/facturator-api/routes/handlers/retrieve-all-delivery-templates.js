const{retrieveAllDeliveryTemplates}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const deliveries=await retrieveAllDeliveryTemplates()
        return res.status(200).send(deliveries)
    }catch(error){
        handleError(error,res)
    }
}