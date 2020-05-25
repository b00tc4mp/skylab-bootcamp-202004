module.exports = (req, res, next) => {
    let body = ''

    req.on('data', chunk => body += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = body.split('&')

        req.body = keyValues.reduce((body, keyValue) => {
            const [key, value] = keyValue.split('=')

            body[key] = decodeURIComponent(value)

            return body
        }, {})

        next()
    })
}