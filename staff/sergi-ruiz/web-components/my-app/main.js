const users = [{ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }]

const landing = Landing(function () {
    landing.replaceWith(register)
}, function () {
    landing.replaceWith(login)
})

const register = Register(function (name, surname, email, password) {
    // TODO if user already exists throw Error, otherwise proceed
    
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