module.exports = (req, res, next) => {
    let data = ''

    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        // hola=mundo&hello=world

        const keyValues = data.split('&')

        req.data = keyValues.reduce((data, keyValue) => {
            const [key, value] = keyValue.split('=')

            data[key] = decodeURIComponent(value)

            return data
        }, {})

        next()
    })
}