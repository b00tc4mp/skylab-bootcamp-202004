const{addClientDiscount}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{clientId,productId,discount}}= req
        const newDiscount= {product:productId,discount}
        await addClientDiscount(clientId,newDiscount)
        return res.status(201).send()

    }catch(error){
        handleError(error,res)
    }
}