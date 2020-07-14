const{addProduct}= require("facturator-server-logic")
const {handleError}= require("../../helpers")

module.exports=async (req,res)=>{
    try{
        const {body:{name,price,description,alergens,tax}}= req
        const product={name,price,description,alergens,tax}
        await addProduct(product)
        return res.status(201).send()
    }catch(error){
        handleError(error,res)
    }
}