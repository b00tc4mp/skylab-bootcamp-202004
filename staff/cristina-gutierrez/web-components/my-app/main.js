const users = []

const landing = Landing(function() {
    landing.replaceWith(register)
}, function() {
    landing.replaceWith(login)
});

const register = Register(function (name, surname, email, password) {
    users.push({
        name,
        surname,
        email,
        password
    })

    register.replaceWith(login)
}, function() {
    register.replaceWith(login)
});

const login = Login(function (email, password) {
    const user = users.find(function(user) { 
        return user.email === email && user.password === password 
    });

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