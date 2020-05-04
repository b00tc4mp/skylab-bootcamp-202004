
ReactDOM.render(<App />, document.getElementById('root'))












// const users = [{name: 'Pol', surname: 'Pepe', email: 'pol.pedro97@gmail.com', password: '123123123'}, {name: 'Pol', surname: 'yo', email: 'pol.pedro977@gmail.com', password: '123123123'}, {name: 'yo', surname: 'mamen', email: 'poul.pedro97@gmail.com', password: '123123123'}, {name: 'Pol', surname: 'Pepe', email: 'pol.pedro9777@gmail.com', password: '123123123'}]
// let enterd = false
// const landing = new Landing(function() {
//     if (!enterd){
//         document.getElementById('root').appendChild(login.container)
//         enterd = true
//     }
//     else{
//         register.container.replaceWith(login.container);
//     }

// }, function() {
//     if (!enterd){ 
//         document.getElementById('root').appendChild(register.container)
//     }else{
//         login.container.replaceWith(register.container);
//         enterd = true
//     }

// });
// const news = new News()
// const news2 = new News2()

// const register = new Register(function(name, surname, email, password) {

//     userDefine(name, surname, email, password);

//     register.container.replaceWith(login.container)
// }, function() {
//     register.container.replaceWith(login.container);
// })

// const login = new Login(function(email, password) {

//     const user = findUser(email, password)

//     if (user) {
//         enterd = false //sow we can chekin again if we log out
//         const home = new Home(user.name, user.surname, function() {
//             home.container.replaceWith(landing.container)
//         }, function(data) {
//             var search = lookUsers(data, users)
//             return search //para no pasar users a la parte de components
//         })
//         login.container.replaceWith(home.landing)
//     }
// }, function() {
//     login.container.replaceWith(register.container);
// })

// const googlesearch = new GoogleComp () 




// document.getElementById('root').appendChild(landing.container) //ACORDARSE DE PONER landing.container googlesearch