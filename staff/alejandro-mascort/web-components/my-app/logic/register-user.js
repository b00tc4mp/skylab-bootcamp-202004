const registerUser = (name, surname, email, password) => {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' is not alphabetic')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' is not alphabetic')

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')

    const user = users.find(user => { return user.email === email })

    if (user) throw new Error('user already exists')

    users.push({
        name,
        surname,
        email,
        password
    })
} 