const users = [{ name: "daria", surname: "potemkina", email: "dariapotemkina@mail.ru", password: "123" }]

const landing = Landing(function () {
    landing.replaceWith(login)
}, function () {
    landing.replaceWith(register)
})

const register = Register(function (name, surname, email, password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            throw new Error('User already exists')

        }
    }

    users.push({
        name,
        surname,
        email,
        password
    })

    register.replaceWith(login)
    
},function () {
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

const home = Home(function () {
    home.replaceWith(landing)
})

document.getElementById('root').appendChild(landing)