const{retrieveAllProducts}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{productId}}= req
        const products=await retrieveAllProducts()
        return res.status(200).send(products)

    }catch(error){
        handleError(error,res)
    }
}