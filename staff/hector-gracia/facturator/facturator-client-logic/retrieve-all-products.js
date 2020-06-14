const {utils:{call}} = require("facturator-commons")

module.exports=()=>{
    return call("GET","http://localhost:8080/api/products/all",undefined,{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===200) return JSON.parse(body)
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}