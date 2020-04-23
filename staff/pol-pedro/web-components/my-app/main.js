const users = [{name: 'Pol', surname: 'Pepe', email: 'pol.pedro97@gmail.com', password: '123123123'}, {name: 'Pol', surname: 'yo', email: 'pol.pedro977@gmail.com', password: '123123123'}, {name: 'yo', surname: 'mamen', email: 'poul.pedro97@gmail.com', password: '123123123'}, {name: 'Pol', surname: 'Pepe', email: 'pol.pedro9777@gmail.com', password: '123123123'}]

const landing = new Landing(function() {

    landing.container.replaceWith(login.container);

}, function() {

    landing.container.replaceWith(register.container);

});

const register = new Register(function(name, surname, email, password) {

    userDefine(name, surname, email, password);

    register.container.replaceWith(login.container)
}, function() {
    register.container.replaceWith(login.container);
})

const login = new Login(function(email, password) {

    const user = findUser(email, password)

    if (user) {
        const home = Home(user.name, user.surname, function() {
            home.replaceWith(landing.container)
        }, function(data) {
            var search = lookUsers(data, users)
            return search //para no pasar users a la parte de components
        })
        login.container.replaceWith(home)
    }
}, function() {
    login.container.replaceWith(register.container);
})



document.getElementById('root').appendChild(landing.container) //ACORDARSE DE PONER landing.container