const{updateClient}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const {body:{name,establishment,contactNumber,email,direction,paymentMethod,paymentInfo,clientId}}= req
        const client={}
        if(name)
            client.name=name
        if(establishment)
            client.establishment=establishment
        if(contactNumber)
            client.contactNumber=contactNumber
        if(email)
            client.email=email
        if(direction)
            client.direction=direction
        if(paymentMethod)
            client.paymentMethod=paymentMethod
        if(paymentInfo)
            client.paymentInfo=paymentInfo
        await updateClient(clientId,client)
        return res.status(201).send()
    }catch(error){
        handleError(error,res)
    }
}