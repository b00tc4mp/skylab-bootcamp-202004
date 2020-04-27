//Componente para registrar usuarios
const register = new Register(function (name, surname, email, password) {
    registerUser(name,surname,email,password);
    register.container.replaceWith(login.container);
},function(){
    register.container.replaceWith(login.container)
});
//Componente para iniciar sesion
const login = new Login(function (email, password) {
    authenticateUser(email,password);
    const user=retrieveUser(email);
    const home=new Navigation(user,function(resultado){
        resultado.changeContent("profile",user);
    },function(resultado){
        resultado.changeContent("discover",user);
    },function(resultado){
        resultado.changeContent("feed",user);
    },function(resultado){
        resultado.changeContent("following",user);
    },function(resultado){
        resultado.changeContent("followers",user);
    },function(resultado){
        resultado.changeContent("likes",user);
    },function(){
        home.container.replaceWith(landing.container);
    },function(resultado){
        resultado.changeContent("news");
    },function(input,user){
        if(input.value.trim()!==""){
            user.makePete(input.value);
            input.value="";
        }
    });
    login.container.replaceWith(home.container);
},function(){login.container.replaceWith(register.container);});

//Componente de la pagina principal
const landing = new Landing(function(){
    landing.container.replaceWith(register.container);
},function(){
    landing.container.replaceWith(login.container);
});
document.getElementById('root').appendChild(landing.container);
