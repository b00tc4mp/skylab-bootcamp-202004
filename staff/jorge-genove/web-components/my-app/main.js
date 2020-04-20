const users = []

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

    if (user) console.log('eureka! you can get in')
    else console.error('wrong credentials')
})


login.replaceWith(Home)

const Home = Home(function(name,surname,email){
   const email = users.find(function(email){
   return email
    `hello ${email.name} ${email.surname}`
   })
    

    
    ocument.getElementById('root').appendChild(register)
