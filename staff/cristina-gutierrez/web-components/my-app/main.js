const users = []

const landing = Landing(function() {
    landing.replaceWith(register)
}, function() {
    landing.replaceWith(login)
});

const register = Register(function (name, surname, email, password) {
    
    registerUser(name, surname, email, password)

    register.replaceWith(login)
}, function() {
    register.replaceWith(login)
});

const login = Login(function (email, password) {


    
    const user = retrieveUser(email)
    
    if (user) {
        const home = Home(user, function() {
            home.replaceWith(register)
        });

        login.replaceWith(home);
    } else {
        console.error('wrong credentials')
    } 
}, function() {
    login.replaceWith(register)
});

document.getElementById('root').appendChild(landing);