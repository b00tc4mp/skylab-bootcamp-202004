const landing = new Landing(function () {
  landing.contain.replaceWith(register.contain);
}, function () {
  landing.contain.replaceWith(login.contain);
});

document.getElementById('root').appendChild(landing.contain);

const register = new Register(function (name, surname, email, password) {
  registerUser(name, surname, email, password);

  register.contain.replaceWith(login.contain);
}, function () {
  register.contain.replaceWith(login.contain);
})

const login = new Login(function (email, password) {
  authenticateUser(email, password);

  const user = retrieveUser(email);

  const home = new Home(user.name, function () {
    home.contain.replaceWith(landing.contain);
  });

  login.contain.replaceWith(home.contain);
}, function () {
  login.contain.replaceWith(register.contain);
})