function call(method, url, body, headers, callback) {
    Http.validateMethod(method)
    URL.validate(url)

    Function.validate(callback)

    const xhr = new XMLHttpRequest()

    xhr.open(method, url)

    if (headers)
        for (const key in headers)
            xhr.setRequestHeader(key, headers[key])

    xhr.onload = function () {
        callback(undefined, this.status, this.responseText)
    }

    xhr.onerror = function () {
        callback(new Error('network error'))
    }

    xhr.send(body ? body : undefined)
}
