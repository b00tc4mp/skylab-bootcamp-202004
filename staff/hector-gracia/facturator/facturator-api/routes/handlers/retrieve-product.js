const{retrieveProduct}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{productId}}= req
        const product=await retrieveProduct(productId)
        return res.status(200).send(product)

    }catch(error){
        handleError(error,res)
    }
}