const{addDeliveryTemplate}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{name}}= req
        await addDeliveryTemplate(name)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}