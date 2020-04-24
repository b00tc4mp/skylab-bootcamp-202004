const landing = new Landing(() => {
    landing.container.replaceWith(register.container)
},
() => {
    landing.container.replaceWith(login.container)
})

const register = new Register((name, surname, email, password) => {
    registerUser(name, surname, email, password)

    register.container.replaceWith(login.container)
},

() => {
    register.container.replaceWith(login.container)
})


const login = new Login(function (email, password) {
    authenticateUser(email, password)

    const user = retrieveUser(email)
    
    const home = new Home(user.name, () => {
        home.container.replaceWith(landing.container)
    })

    login.container.replaceWith(home.container)
},
() => {
    login.container.replaceWith(register.container)
})


document.getElementById('root').appendChild(landing.container)