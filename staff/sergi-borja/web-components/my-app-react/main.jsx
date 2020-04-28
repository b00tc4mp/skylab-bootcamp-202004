ReactDOM.render(<App />, document.getElementById('root'))

// const landing = new Landing(function () {
//     landing.container.replaceWith(register.container)
// }, function () {
//     landing.container.replaceWith(login.container)
// })

// const register = new Register(function (name, surname, email, password) {
//     registerUser(name, surname, email, password)

//     register.container.replaceWith(login.container)
// }, function () {
//     register.container.replaceWith(login.container)
// })

// const login = new Login(function (email, password) {
//     authenticateUser(email, password)
//     const user = retrieveUser(email)

//     const home = new Home(user.name, function () {
//         home.container.replaceWith(landing.container)
        
//     },  function(){
//         const homeGoogle = new HomeGoogle(function(){
//             homeGoogle.container.replaceWith(home.container)
//     }, function(){
//         homeGoogle.container.replaceWith(landing.container)
//     })
//     home.container.replaceWith(homeGoogle.container)

//     }, function(){
//         const homeHola = new HomeHola(function(){
//             homeHola.container.replaceWith(home.container)
//     }, function(){
//         homeHola.container.replaceWith(landing.container)
//     })
//     home.container.replaceWith(homeHola.container)
//     })
// login.container.replaceWith(home.container)


// }, function() {
//     login.container.replaceWith(register.container)
// })

// // document.getElementById('root').appendChild(new Home('pepito', function() {}))
// document.getElementById('root').appendChild(landing.container)