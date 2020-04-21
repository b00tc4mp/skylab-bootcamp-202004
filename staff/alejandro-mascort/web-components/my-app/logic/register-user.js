function registerUser(name, surname, email, password) {
        // TODO validate input fields
        if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
        if (!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format')
    
        if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
        if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' does not match the format')
    
        if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
        if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an email')
    
        if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
        if (password.length < 8) throw new Error('password does not have the min length')
    
    if (!users.some(user => user.email === email)) {
    
        users.push({
            name,
            surname,
            email,
            password
        })

    } else throw new Error('This email has been already registered')
}