const {utils:{call}} = require("facturator-commons")

module.exports=(newClient)=>{
    if(typeof newClient!=="object") throw new TypeError(newClient+" is not an object")
    return call("POST","http://localhost:8080/api/clients",JSON.stringify(newClient),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}