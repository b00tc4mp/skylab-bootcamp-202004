const{retrieveDeliveryList}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        //const {body:{}}= req
        const deliveryList= await retrieveDeliveryList()
        return res.status(200).send(deliveryList)

    }catch(error){
        handleError(error,res)
    }
}