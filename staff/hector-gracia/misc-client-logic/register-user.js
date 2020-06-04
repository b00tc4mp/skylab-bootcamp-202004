require("misc-commons/polyfills/string")
require("misc-commons/polyfills/function")
const{utils:{Email,call}}= require("misc-commons")

module.exports=(name,surname,email,password)=>{
    String.validate(name)
    String.validate(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password,8)
    Promise.resolve(call("POST","http://localhost:8080/users",JSON.stringify({name,surname,email,password}),{"Content-type":"application/json"})
            .then(result=>{
                if(result.status!==201) throw new Error("Wrong status")
                return undefined
            })
            .catch(error=>{
                throw new Error(error)
            }))
}