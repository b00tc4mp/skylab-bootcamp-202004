require("misc-commons/polyfills/string")
require("misc-commons/polyfills/function")
const{utils:{Email,call}}= require("misc-commons")

module.exports=(email,password)=>{
    
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password,8)
    Promise.resolve(call("POST","http://localhost:8080/users/auth",JSON.stringify({email,password}),{"Content-type":"application/json"})
            .then(result=>{
                if(result.status!==201) throw new Error("Wrong status")
                return result.body
            })
            .catch(error=>{
                throw new Error(error)
            }))
}