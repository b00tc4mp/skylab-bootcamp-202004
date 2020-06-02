const {jwtPromise}=require("../utils")

module.exports=(secret,errorHandler)=>{
    return (req,res,next)=>{
        try{
            const [,token]= req.header("authorization").split(" ")
            jwtPromise.verify(token,secret)
                .then(payload=>{
                    req.payload=payload
                    next()
                })
        }catch(error){
            errorHandler(error,res)
        }
    }
}