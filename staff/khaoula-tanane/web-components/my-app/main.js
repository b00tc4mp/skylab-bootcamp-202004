
let feedback

const register = Register(function (name, surname, email, password) {
    registerUser(name, surname, email, password)

    register.replaceWith(login)
}, function(){
    register.replaceWith(login)
})


const login = Login(function (email, password) {
    authenticateUser(email, password)
    const user = retrieveUser(email)
    const homeContainer =  Home(user.name, function(){
        homeContainer.replaceWith(landing)
    })
        
    login.replaceWith(homeContainer)
}, function(){
    login.replaceWith(register)
})


const landing = Landing(function(){
    landing.replaceWith(register)
},function(){
    landing.replaceWith(login)
})

document.getElementById('root').appendChild(landing)