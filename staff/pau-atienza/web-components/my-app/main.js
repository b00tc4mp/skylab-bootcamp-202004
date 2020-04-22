const landing = Landing()

const register = Register(
    function (name, surname, email, password) {
        registerUser(name, surname, email, password)

        register.replaceWith(login)
}, function(){
        register.replaceWith(login)
        clearForms()
})

const login = Login(
    function (email, password) {
        authenticateUser(email, password)

        const user = retrieveUserByEmail(email)
        home = Home(user)
        login.replaceWith(home);
        clearForms()

}, function(){
        login.replaceWith(register)
        clearForms()
});

document.getElementById('root').appendChild(landing)