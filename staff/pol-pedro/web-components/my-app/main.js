const users = []

const landing = Landing(function() {

    landing.replaceWith(login);

}, function() {

    landing.replaceWith(register);

});

const register = Register(function(name, surname, email, password) {

    userDefine(name, surname, email, password);

    register.replaceWith(login)
}, function() {
    register.replaceWith(login);
})

const login = Login(function(email, password) {

    const user = findUser(email, password)

    if (user) {
        const home = Home(user.name, user.surname, function() {
            home.replaceWith(landing)
        }, function(data) {
            var search = lookUsers(data, users)
            return search //para no pasar users a la parte de components
        })
        login.replaceWith(home)
    }
}, function() {
    login.replaceWith(register);
})



document.getElementById('root').appendChild(landing)

//hacer el sanityse (no enviar el pasword)
//