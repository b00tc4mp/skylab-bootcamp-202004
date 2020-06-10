var URL = require('url').URL;

URL.isUrl = function (url) {debugger
    try {
        new URL(url)

        return true
    } catch (error) {
        return false
    }
}

URL.validate = function (url) {
    if (!this.isUrl(url)) throw new Error(`${url} is not a url`)
}.bind(URL)