// const Http = require('./http')
// require('../polyfills/url')
// require('../polyfills/function')

// module.exports = function (method, url, body, headers, callback) {
//     Http.validateMethod(method)
//     URL.validate(url)

//     if (arguments.length > 4)
//         Function.validate(callback)

//     const promise = new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest()

//         xhr.open(method, url)

//         if (headers)
//             for (const key in headers)
//                 xhr.setRequestHeader(key, headers[key])

//         xhr.onload = function () {
//             resolve({ status: this.status, body: this.responseText })
//         }

//         xhr.onerror = function (error) {
//             debugger
//             reject(new Error('network error'))
//         }

//         xhr.send(body ? body : undefined)
//     })

//     if (arguments.length < 5) return promise

//     promise
//         .then(({ status, body }) => callback(null, status, body))
//         .catch(callback)
// }
const Http = require('./http')
require('../polyfills/url')
require('../polyfills/function')

module.exports = function (method, url, body, headers) {
    Http.validateMethod(method)
    URL.validate(url)

    return (async () => {
        const res = await fetch(url, { method, headers, body })
        const content = await res.text()
        return { status: res.status, body: content }
    })()

    // if (arguments.length > 4)
    //     Function.validate(callback)

    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest()

    //     xhr.open(method, url)

    //     if (headers)
    //         for (const key in headers)
    //             xhr.setRequestHeader(key, headers[key])

    //     xhr.onload = function () {
    //         resolve({ status: this.status, body: this.responseText })
    //     }

    //     xhr.onerror = function (error) {
    //         debugger
    //         reject(new Error('network error'))
    //     }

    //     xhr.send(body ? body : undefined)
    // })

    // if (arguments.length < 5) return promise

    // promise
    //     .then(({ status, body }) => callback(null, status, body))
    //     .catch(callback)
}

// const Http = require('./http')
// require('../polyfills/url')
// const XMLHttpRequest = require('xhr2');

// module.exports = (method, url, body, headers) => {
//     Http.validateMethod(method)
//     URL.validate(url)

//     const xhr = new XMLHttpRequest()

//     return new Promise((resolve, reject) => {

//         xhr.open(method, url)

//         if (headers)
//             for (const key in headers)
//                 xhr.setRequestHeader(key, headers[key])

//         xhr.onload = function () {
//             resolve({ status: this.status, body: this.responseText })
//         }

//         xhr.onerror = function () {
//             reject(new Error('network error'))
//         }

//         xhr.send(body ? body : undefined)
//     })

// }