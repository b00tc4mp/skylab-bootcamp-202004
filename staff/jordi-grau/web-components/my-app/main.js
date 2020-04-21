const users = [{name: 'Daniel', surname: 'Zamora', email: 'da@nubar.com', password: '123' }];

const landing = Landing(function () {
    landing.replaceWith(register);
  },
  function () {
    landing.replaceWith(login);
  }
);

const register = Register(function (name, surname, email, password) {
    const actual = users.find(function(actual){
        return user.email === email
    })
    if (actual) {
        throw new Error ('The email already exist');
    }else {
    users.push({name, surname, email, password,});
    }
    register.replaceWith(login);
// }, function () {
    const home = Home(user.name, user.surname, function () {
        home.replaceWith(landing);
      });
}, function () {register.replaceWith(home);

});

const login = Login(function (email, password) {
  const user = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (user) {
    const home = Home(user.name, user.surname, function () {
      home.replaceWith(landing);
    });

    login.replaceWith(home);
  } else throw new Error("Wrong credentials");
}, function () {
    login.replaceWith(register);
});

document.getElementById("root").appendChild(landing);