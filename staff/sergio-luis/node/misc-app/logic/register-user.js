const fs = require('fs')
const path = require('path')
require('../utils/string')
require('../utils/function')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')


module.exports = (register, callback) => {

    const { name, surname, email, password } = register


    String.validate.notVoid(name)
    String.validate.notVoid(surname)

    String.validate.notVoid(email)
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)

    let existUser = false;

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) => {
        if (error) return callback(error)

        let wasError = false
        if (!files.length) {
            const id = uid();
            fs.writeFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`),
                JSON.prettify({ name, surname, email, password, id }),
                (error) => {
                    if (error) return callback(error);

                    callback(null, id)


                })

            return
        }
        let count = 0;
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, body) => {
                count++
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const { email: _email } = JSON.parse(body)

                    if (_email === email) {
                        existUser = true;
                        return callback(new Error('The user already exist'))
                    }

                    if (count === files.length) {
                        if (!existUser) {
                            const id = uid();
                            fs.writeFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`),
                                JSON.prettify({ name, surname, email, password, id }),
                                (error) => {
                                    if (error) return callback(error);

                                    callback(null, id)

                                })
                        }
                    }

                }
            })
        })


    })
}


// const fs = require("fs");
// const path = require("path");
// const uid = require('../utils/uid')
// const Email = require('../utils/email')
// require('../utils/string')

// function register({name, surname, email, password}, callback) {
//   String.validate.alphabetic(name);
//   String.validate.alphabetic(surname);

//   Email.validate(email);
//   String.validate.lengthGreaterEqualThan(password, 8);

//   // Function.validate(callback)

//   fs.readdir(path.join(__dirname, "..", "data", "users"), (error, files) => {
//     if (error) throw error;

//     let count = 0;
//     let failedBefore = false

//     files = files.filter(file => path.extname(file) === '.json')

//     if (files.length) {
//       files.forEach((file) => {

//         fs.readFile(
//           path.join(__dirname, "..", "data", "users", file),
//           (error, data) => {
//             if (!failedBefore) {
//               if (error) {
//                 callback(error);

//                 failedBefore = true

//                 return
//               }

//               const { email: _email } = JSON.parse(data);

//               console.log(email)

//               if (_email === email) return callback(new Error("User with this email already registered"));
//               else count++;

//               if (count === files.length) {
//                 const id = uid()

//                 const file = `${id}.json`

//                 const _user = {
//                     name,
//                     surname,
//                     email,
//                     password,
//                 }

//                 fs.writeFile(path.join(__dirname, "..", "data", "users", file), JSON.stringify(_user, null, 4), error => {
//                     if (error) throw error

//                     callback(null, id)

//                 });
//               }

//             }
//           }
//         );
//       });
//     } else {
//       console.log('inn')
//       const id = uid()

//       const file = `${id}.json`

//       const _user = {
//           name,
//           surname,
//           email,
//           password,
//       }

//       fs.writeFile(path.join(__dirname, "..", "data", "users", file), JSON.stringify(_user, null, 4), error => {
//           if (error) throw error

//           callback(null, id)

//       });
//     }
//   });
// }

// module.exports = register