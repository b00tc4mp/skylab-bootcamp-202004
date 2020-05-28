module.exports = (req, res, next) => {
    const cookie = req.header('cookie')

    req.cookie = {}

    if (cookie) {
        const keyValues = cookie.split(';').map(keyValue => keyValue.trim())


        keyValues.reduce((cookie, keyValue) => {
            const [key, value] = keyValue.split('=')
            cookie[key] = decodeURIComponent(value)
            return cookie
        }, req.cookie)
    }
    next()
    // if (!cookie) res.redirect('/login')
    // const [, userId] = cookie.split('=')
}