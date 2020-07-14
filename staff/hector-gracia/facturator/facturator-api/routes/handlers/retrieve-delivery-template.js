const{retrieveDeliveryTemplate}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {params: { templateId} } = req
        const template = await retrieveDeliveryTemplate(templateId)
        return res.status(200).send(template)

    }catch(error){
        handleError(error,res)
    }
}