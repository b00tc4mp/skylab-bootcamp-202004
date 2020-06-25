const Http = require('./http')
require('../polyfills/url')
require('../polyfills/function')
global.XMLHttpRequest = require ('xhr2')

module.exports = (method, url, body, headers) => {
    Http.validateMethod(method)
    URL.validate(url)

    return new Promise ((resolve, reject) => {

        const xhr = new XMLHttpRequest()
    
        xhr.open(method, url)
        
        if (headers)
            for (const key in headers)
                xhr.setRequestHeader(key, headers[key])
        
        xhr.onload = function () {
            return resolve({status: this.status, body: this.responseText})
        }

        xhr.onerror = function () {
            return reject(new Error ('network error'))
        }
        
        xhr.send(body ? body : undefined)
    })
}