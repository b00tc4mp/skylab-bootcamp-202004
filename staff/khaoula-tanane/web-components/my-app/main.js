const users = [{name: "a", surname: "a", email: "a@a", password: "a"}]

const TEXT_REGEX = /[A-Za-z]{1,20}/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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