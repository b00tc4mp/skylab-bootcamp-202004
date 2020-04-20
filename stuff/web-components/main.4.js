const users = []

document.getElementById('root').appendChild(Register(function (name, surname, email, password) {
    users.push({
        name,
        surname,
        email,
        password
    })

    console.log(users)
}))

document.getElementById('root').appendChild(Login(function (email, password) {
    const user = users.find(function(user) { 
        return user.email === email && user.password === password 
    })

    if (user) console.log('eureka! you can get in')
    else console.error('wrong credentials')
}))