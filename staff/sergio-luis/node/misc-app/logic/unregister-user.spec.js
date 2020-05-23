// const register = require('./register-user')
// const authenticate = require('./authenticate-user')
// const retrieve = require('./retrieve-user')
// const unregister = require('./unregister-user')
// const assert = require('assert')
// const { random } = Math
// const fs = require('fs')
// const path = require('path')


// //TODO Test with mocha
//     let name = `name-${random()}`;
//     let surname = `surname${random()}`;
//     let email = `${random()}@mail.com`;
//     let password = `${random()}` 

//     register({name, surname, email, password}, (error,body)=>{
//         assert(!error)
        
//         debugger
//         authenticate({email,password},(error,body)=>{
//             assert(!error)
//             const id = body
//             debugger
//             retrieve(id,(error,body)=>{
//                 assert(!error)

//                 const {name:_name,surname:_surname,email:_email} = body
//                 debugger
//                 assert.equal(name,_name)
//                 assert.equal(surname,_surname)
//                 assert.equal(email,_email)

//                 unregister({email,password},(error,body)=>{
//                     debugger
//                     assert(!error)
//                     console.log(body)
                
//                 })
//             })

//         })
//     })