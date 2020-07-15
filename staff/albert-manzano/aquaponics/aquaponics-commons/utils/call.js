const Http = require('./http')
require('../polyfills/url')
require('../polyfills/function')

module.exports = function (method, url, body, headers) {
    Http.validateMethod(method)
    URL.validate(url)
   
    return fetch(url, {
        method: method || 'GET',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then((res)=>{
        return res.text()
        .then(body=>{
            return {
                status: res.status,
                body
            }
        
        })
    
    })
    .catch(error=> new Error(error));
}
