require('../polyfills/string')

module.exports = function (token) {
   
    String.validate(token)
    const [, payloadBase64] = token.split('.')

    const payloadJson = atob(payloadBase64)

    const payload = JSON.parse(payloadJson)

    const { sub: userId } = payload
    
    return userId  
}
