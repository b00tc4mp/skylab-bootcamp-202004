const {utils:{call}} = require("facturator-commons")

module.exports=(clientId)=>{
    return call("DELETE","http://localhost:8080/api/clients/remove",JSON.stringify({clientId}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}