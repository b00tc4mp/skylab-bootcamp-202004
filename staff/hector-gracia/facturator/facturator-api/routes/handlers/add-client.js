const{addClient}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const {body:{name,establishment,contactNumber,email,direction,paymentMethod,paymentInfo}}= req
        const client={name,establishment,contactNumber,email,direction,paymentMethod,paymentInfo}
        await addClient(client)
        return res.status(201).send()
    }catch(error){
        handleError(error,res)
    }
}