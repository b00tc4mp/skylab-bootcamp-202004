const users = [{ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }]

const landing = Landing(function () {
    landing.replaceWith(register)
}, function () {
    landing.replaceWith(login)
})

const register = Register(function (name, surname, email, password) {
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

const login = Login(function (email, password, onError, onSuccess) {
    const user = users.find(function (user) {
        return user.email === email && user.password === password
    })

    if (user) {
        const home = Home(user.name, function () {
            home.replaceWith(landing)
        })

        login.replaceWith(home)

        onSuccess()
    } else onError('wrong credentials')
}, function () {
    login.replaceWith(register)
})

document.getElementById('root').appendChild(landing)