const{retrieveClient}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const {params: { clientId} } = req
        const client=await retrieveClient(clientId)
        return res.status(200).send(client)
    }catch(error){
        handleError(error,res)
    }
}