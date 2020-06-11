const{addDeliveryTemplate}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{name,products}}= req
        template={name,products}
        await addDeliveryTemplate(template)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}