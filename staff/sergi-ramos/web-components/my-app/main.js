const landing = new Landing( () => {

    landing.container.replaceWith(register.container)

}, () => {

    landing.container.replaceWith(login.container)
})

const register = new Register( (name, surname, email, password) => { debugger

    registerUser(name, surname, email, password) 

    register.container.replaceWith(login.container)
},  () => {
    register.container.replaceWith(login.container)
})

const login = new Login( (email, password) => {

    loginUser(email, password)

    const user = retrieveUser(email)

    if (user) {
        const home = new Home(user.name, () => {
            home.container.replaceWith(landing.container)
        })
        login.container.replaceWith(home.container)
    }

},  () => {
    login.container.replaceWith(register.container)
})
document.getElementById('root').appendChild(landing.container)
