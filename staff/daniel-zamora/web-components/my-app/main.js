const landing = Landing(function () {
    landing.replaceWith(register);
  },
  function () {
    landing.replaceWith(login);
  }
);

const register = Register(function (name, surname, email, password) {
    userRegister(name,surname,email,password)
  
    register.replaceWith(login);
}, function () {
    register.replaceWith(home);
});

const login = Login(function (email, password) {
  authenticateUser(email,password)
  
  const user = retrieveUser(email)

    const home = Home(user.name, user.surname, function () {
      home.replaceWith(landing);
    })

    login.replaceWith(home);
}, function () {
    login.replaceWith(register);
});

document.getElementById("root").appendChild(landing);
