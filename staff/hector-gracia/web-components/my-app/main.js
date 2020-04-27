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
//Componente con los tweets
//
//los petes
/*
users[0].makePete("Hola Don Pepito");
users[0].makePete("Hola Don Jose");
const home=new Navigation("Manolo",function(){home.container.replaceWith(landing.container)});
const navigation=new Navigation("Usuario",function(resultado){
    resultado.changeContent("profile",users[0]);
},function(resultado){
    resultado.changeContent("Buscador",users[0]);
},function(resultado){
    resultado.changeContent("feed",users[0]);
},function(resultado){
    resultado.changeContent("following",users[0]);
},function(resultado){
    resultado.changeContent("followers",users[0]);
},function(resultado){
    resultado.changeContent("likes",users[0]);
},function(){
    navigation.container.replaceWith(landing.container);
})
*/
//document.getElementById('root').appendChild(landing.container)
document.getElementById('root').appendChild(landing.container);
