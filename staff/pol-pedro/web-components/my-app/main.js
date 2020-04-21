const users = []

const landing = Landing(function () {

    landing.replaceWith(login);

}, function () {

    landing.replaceWith(register);

});

/*const landing = Landing(function () {
    landing.replaceWith(register)
}, function () {
    landing.replaceWith(login)
})*/


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
        const home = Home(user.name, user.surname, function (){
           home.replaceWith(register)
        })
        login.replaceWith(home)
        console.log('eureka! you can get in')
    }  
    else console.error('wrong credentials') 
})



document.getElementById('root').appendChild(landing)