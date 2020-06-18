const { JsonWebTokenError } = require("jsonwebtoken")

JSON.prettify = function(object) {
    return this.stringify(object, null, 4)
} 

JSON.validate = function(object){
    try{
        if (typeof object === "number" || typeof object === "string" || typeof object === "boolean" || typeof object === "bigint" || typeof object === "symbol") throw Error 
        
        JSON.parse(JSON.stringify(object))
    }catch(error){
        if(error)throw new TypeError(`${object} is not a valid JSON`)
    }
}

JSON.validateNotArray = function(object){
    JSON.validate(object)

    if(object instanceof Array)throw new TypeError(`${object} is not a valid JSON or is an Array`)
}