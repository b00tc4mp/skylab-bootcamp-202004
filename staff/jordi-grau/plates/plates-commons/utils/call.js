const Http = require('./http')
require('../polyfills/url')




module.exports = (method, url, body, headers) => {
    Http.validateMethod(method)
    URL.validate(url)

    return (async()=>{
        debugger
        try{
            const resp = await fetch(url,{method,headers,body})
            const _body = await resp.text()
    
            return {status: resp.status,body:_body}
        }catch(error){
            throw new Error('network error')
        }
     
    })()
}
