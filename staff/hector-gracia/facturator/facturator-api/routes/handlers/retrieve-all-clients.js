const{retrieveAllClients}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const clients=await retrieveAllClients()
        return res.status(201).send(clients)
    }catch(error){
        handleError(error,res)
    }
}