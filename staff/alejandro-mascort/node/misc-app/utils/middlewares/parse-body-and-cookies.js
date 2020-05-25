module.exports = (req, res, next) => {
    let body = ''

    const cookies = req.header('cookie')

    req.cookies = {}

    req.on('data', chunk => body += chunk)

    if (cookies) {
        const keyValues = cookies.split(';').map(keyValue => keyValue.trim())

        keyValues.reduce((cookies, keyValue) => {
            const [key, value] = keyValue.split('=')

            cookies[key] = decodeURIComponent(value)

            return cookies
        }, req.cookies)
    }
    
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