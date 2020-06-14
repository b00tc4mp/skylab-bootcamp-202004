const {utils:{call}} = require("facturator-commons")

module.exports=(updatedClient)=>{
    if(typeof updatedClient!=="object") throw new TypeError(updatedClient+" is not an object")
    return call("POST","http://localhost:8080/api/clients/update",JSON.stringify(updatedClient),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}