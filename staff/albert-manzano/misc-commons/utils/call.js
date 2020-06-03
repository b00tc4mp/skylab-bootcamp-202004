const Http = require('./http')
require('../polyfills/url')
var URL = require('url').URL
global.XMLHttpRequest = require('xhr2')

module.exports = (method, url, body, headers) => {
    Http.validateMethod(method)
    URL.validate(url)

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        if (headers)
            for (const key in headers)
                xhr.setRequestHeader(key, headers[key])
       
        xhr.onload = function () {
            resolve({ status: this.status, response: this.responseText })
        }
        
        xhr.onerror = function () {
            const error = new Error('connection error')
            reject(error)
        }

        xhr.send(body ? body : undefined)
    })
}