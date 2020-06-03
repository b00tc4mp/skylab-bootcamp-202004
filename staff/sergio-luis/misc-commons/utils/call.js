const Http = require('./http')
require('../polyfills/url')


module.exports = (method, url, body, headers) => {
    Http.validateMethod(method)
    URL.validate(url)
    const xhr = new XMLHttpRequest()

    return new Promise((resolve,reject)=>{
        
        xhr.open(method, url)

        if (headers)
            for (const key in headers)
                xhr.setRequestHeader(key, headers[key])

        xhr.onload = function () {
            resolve({status:this.status,body:this.responseText})
        }

        xhr.onerror = function () {
            reject(new Error('network error'))
        }

        xhr.send(body ? body : undefined)
    })
   
}
