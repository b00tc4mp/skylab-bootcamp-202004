const landing = Landing(function(){

    landing.replaceWith(register)

},function(){
    
    landing.replaceWith(login)
})

const register = Register(function (name, surname, email, password) {   debugger
    
   registerUser(name,surname,email,password)

    register.replaceWith(login)
},function(){
    register.replaceWith(login)
})

const login = Login(function (email, password) {   debugger

    loginUser(email, password)

    const user = retrieveUser(email)

    if (user) {
        const home = Home(user.name, function(){ 
            home.replaceWith(landing)
        })
        login.replaceWith(home)
  }
     
},function(){
login.replaceWith(register)
})
document.getElementById('root').appendChild(landing)
