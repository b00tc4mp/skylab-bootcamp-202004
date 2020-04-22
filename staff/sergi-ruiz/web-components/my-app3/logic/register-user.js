function registerUser(name, surname, email, password) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format')
    if (name.length < 1) throw new Error('field name is empty')
    if (name === undefined) throw new Error('name is undefined')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' does not match the format')
    if (surname.length < 1) throw new Error('field surname is empty')
    if (surname === undefined) throw new Error('surname is undefined')

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')
    if (email.length < 1) throw new Error('field email is empty')
    if (email === undefined) throw new Error('email is undefined')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')
    if (password === undefined) throw new Error('password is undefined')


    const user = users.find(function(user) { return user.email === email })

    if (user) throw new Error('user already exists')

    users.push({
        name,
        surname,
        email,
        password
    })
}