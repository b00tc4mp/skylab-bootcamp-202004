var users = [];


const landing = Landing(function() {
    landing.replaceWith(register);
}, function() {
    landing.replaceWith(login);
});

const register = Register(function(name, surname, email, password) {
    users.push({
        name,
        surname,
        email,
        password
    })
    register.replaceWith(login);
});

const login = Login(function(email, password) {
    let user;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            user = users[i].name
        }
    }
    if(typeof user!== "undefined") {
        const home = Home(user, function(){
            login.replaceWith(register)
        })
        login.replaceWith(home)
    }else{
        console.log('ERROR');  
    } 
});


document.getElementById('root').appendChild(landing)