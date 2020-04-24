const users = [{ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123123123' }]

const landing = Landing(function () {
    landing.replaceWith(register)
}, function () {
    landing.replaceWith(login)
})

const TEXT_REGEX = /[A-Za-z]{1,20}/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const register = Register(function (name, surname, email, password) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' does not match the format')

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' does not match the format')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')

    const user = users.find(function(user) { return user.email === email })

    if (user) throw new Error('user already exists')
    
    users.push({
        name,
        surname,
        email,
        password
    })

    register.replaceWith(login)
}, function () {
    register.replaceWith(login)
})

const login = Login(function (email, password) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' does not match the format')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')

    const user = users.find(function (user) {
        return user.email === email && user.password === password
    })

    if (user) {
        const home = Home(user.name, function () {
            home.replaceWith(landing)
        })

        login.replaceWith(home)
    } else throw new Error('wrong credentials')
}, function () {
    login.replaceWith(register)
})

document.getElementById('root').appendChild(landing)