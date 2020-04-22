function authenticateUser(email, password) {

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' does not match the format')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')
    
    const _user = users.find(function(user) { 
        return user.email === email && user.password === password 
    })


    if (!_user) throw new Error('wrong credentials')

    const {name, username, surname} = _user
    return {name, username, surname}

}