const{retrieveClientDiscountList}= require("facturator-server-logic")
const {handleError}= require("../../helpers")
module.exports=async(req,res)=>{
    try{
        const {body:{clientId}}= req
        const discountList=await retrieveClientDiscountList(clientId)
        return res.status(200).send(discountList)

    }catch(error){
        handleError(error,res)
    }
}