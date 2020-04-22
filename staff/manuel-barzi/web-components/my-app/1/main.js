const users = []

const register = Register(function (name, surname, email, password) {
    users.push({
        name,
        surname,
        email,
        password
    })

    register.replaceWith(login)
})

const login = Login(function (email, password) {
    const user = users.find(function(user) { 
        return user.email === email && user.password === password 
    })

    if (user) {
        const home = Home(user.name, function() {
            home.replaceWith(register)
        })

        login.replaceWith(home)
    } else console.error('wrong credentials')
})

document.getElementById('root').appendChild(register)