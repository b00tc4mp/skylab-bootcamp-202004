const{removeClient}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const {body:{clientId}}= req
        const client=await removeClient(clientId)
        return res.status(201).send()
    }catch(error){
        handleError(error,res)
    }
}