const users = []

const landing = Landing()


const register = Register(function (name, surname, email, password) {
    users.push({
        name,
        surname,
        email,
        password
    })

    register.replaceWith(login)
})

const loggeduser = {}

const login = Login(function (email, password) {
    const user = users.find(function(user) { 
        return user.email === email && user.password === password 
    })

    if (user){
        console.log('eureka! you can get in')
        home = Home(user)
        login.replaceWith(home);
    } else console.error('wrong credentials')
});




document.getElementById('root').appendChild(landing)