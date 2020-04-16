function authenticate(username, password) {
    if (typeof username !== 'string') throw new TypeError(username + ' is not valid username')
    if (!username.length) throw new Error('username is empty')

    if (typeof password !== 'string') throw new TypeError(password + ' is not valid password')
    if (!password.length) throw new Error('password is empty')

    if (username !== 'pepito' || password !== '123') throw Error('wrong credentials')
}


function access() {
    try {
        var username = prompt('username')
        var password = prompt('password')

        authenticate(username, password)

        console.log('eureka! you are allowed to access the application!')
    } catch(error) {
        alert('sorry, buddy, there was an error: ' + error.message)

        access()
    }
}

access()