const landing = new Landing(function(){
        landing.container.replaceWith(register.container)
}, function(){
        landing.container.replaceWith(login.container)
})

const register = new Register(
    function (name, surname, email, password) {
        registerUser(name, surname, email, password)

        register.container.replaceWith(login.container)
}, function(){
        register.container.replaceWith(login.container)
        clearForms()
})

const login = new Login(
    function (email, password) {
        authenticateUser(email, password)

        const user = retrieveUser(email)
        home = new Home(user)
        login.container.replaceWith(home.container)
        clearForms()
}, function(){
        login.container.replaceWith(register.container)
        clearForms()
});

// document.getElementById('root').appendChild(landing.container)
document.getElementById('root').appendChild(new Home({name: 'Pau'}).container)
