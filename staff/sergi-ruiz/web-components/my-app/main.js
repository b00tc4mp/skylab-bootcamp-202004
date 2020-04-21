const users = []

const landing = Landing(function() {

    landing.replaceWith(login);

}, function() {

    landing.replaceWith(register);

});

const register = Register(function(name, surname, email, password) {

    userDefine(users, name, surname, email, password);

    register.replaceWith(login)
}, function() {
    register.replaceWith(login);
})

const login = Login(function(email, password) {

    const user = findUser(email, password)

    if (user) {
        const home = Home(user.name, user.surname, function() {
            home.replaceWith(register)
        })
        login.replaceWith(home)
    }
}, function() {
    landing.replaceWith(register);
})



document.getElementById('root').appendChild(landing)