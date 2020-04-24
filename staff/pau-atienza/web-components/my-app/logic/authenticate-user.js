function authenticateUser(email, password){
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')

    const user = users.find(user => user.email === email && user.password === password)
    // const user = users.find(({ , , uemail, upassword}) => uemail === email && upassword === password)

    if (!user) throw new Error('wrong credentials')
}