//Componente para registrar usuarios
const register = Register(function (name, surname, email, password) {
    registerUser(name,surname,email,password);
    register.replaceWith(login);
},function(){
    register.replaceWith(login)
})
//Componente para iniciar sesion
const login = Login(function (email, password) {
    authenticateUser(email,password);
    const user=retrieveUser(email);
    const home=Home(user.name,function(){home.replaceWith(landing)});
    login.replaceWith(home);
},function(){login.replaceWith(register);})

//Componente de la pagina principal
const landing = Landing(function(){
    landing.replaceWith(register);
},function(){
    landing.replaceWith(login);
})

document.getElementById('root').appendChild(landing)
