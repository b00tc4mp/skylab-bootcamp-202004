module.exports = (req, res, next) => {
    const cookies = req.header('cookie')

    req.cookies = {}

    if (cookies) {
        const keyValues = cookies.split(';').map(keyValue => keyValue.trim())

        keyValues.reduce((cookies, keyValue) => {
            const [key, value] = keyValue.split('=')

            cookies[key] = decodeURIComponent(value)

            return cookies
        }, req.cookies)
    }

    next()
}