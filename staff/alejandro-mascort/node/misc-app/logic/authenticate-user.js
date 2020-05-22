// const fs = require("fs");
// const path = require("path");
// const Email = require('../utils/email')
// require('../utils/string')

// module.exports = ({email, password}, callback) => {
//     Email.validate(email)

//     String.validate.notVoid(password)

//     // Function.validate(callback)

//     fs.readdir(path.join(__dirname, "..", "data", "users"), (error, files) => {
//         if (error) throw error;

//         let count = 0;
//         const logged = []
        
//         files.forEach((file) => {
          
//           fs.readFile(
//             path.join(__dirname, "..", "data", "users", file),
//             (error, data) => {
//                 if (error) throw error;

//                 count++

//                 const { email: _email, password: _password, user } = JSON.parse(data);

//                 if (_email === email && _password === password)  logged.push(user)
                                
//                 if (count === files.length) {
//                     logged.length ? callback(null, logged[0].user) : callback(new Error('invalid email or password'))
//                 }
                
//             })
//         });
//     });
// }


// // const fs = require('fs')
// // const path = require('path')
// // require('../utils/string')
// // require('../utils/function')
// // const Email = require('../utils/email')
// // const uid = require('../utils/uid')
// // require('../utils/json')


// // module.exports = (date, callback) => {
    
// //     const {email,password} = date

// //     String.validate.notVoid(email)
// //     Email.validate(email)

// //     String.validate.lengthGreaterEqualThan(password, 8)

// //     Function.validate(callback)

// // fs.readdir(path.join(__dirname, '..', 'data','users'), (error, files) => {
// //         if (error) return callback(error)
// //         let wasError = false
// //         let find = false
// //         let result = []
// //         let count = 0
// //        debugger
// //         files.forEach(file => {
// //             fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, body) => {
// //                 count++
// //                 if (error) {
// //                     if (!wasError) {
// //                         callback(error)

// //                         wasError = true
// //                     }

// //                     return
// //                 }

// //                 if (!wasError) {
// //                     const authenticate = JSON.parse(body)
// //                     const {email:_email,password:_password, id:_id} = authenticate

// //                     if(email === _email && password===_password) {
// //                         find = true
// //                         return callback(null,_id)
                    
// //                     }
                    
// //                     if(count === files.length) {
// //                        if(!find) return callback(null,'not find')
// //                     }  
                    
// //                 }
// //             })
// //         })
// // })
// // }


require('../utils/string')
const Email = require('../utils/email')
const fs = require('fs')
require('../utils/function')
const path = require('path')
require('../utils/json')
const { find } = require('../data/users')

module.exports = (email, password, callback) => {
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    find({ email }, (error, [user]) => {
        if (error) return callback(error)

        if (user) return callback(new Error('Invalid credentials'))

        if (user.password !== password) return callback(new Error('Invalid credentials'))

        callback(null, user.id)

    })
}