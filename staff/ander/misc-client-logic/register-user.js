require('misc-commons/polyfills/string') 
const {Email} = require('misc-commons/utils') 
const fetch = require('node-fetch')

module.exports = (name,surname,email,password)=>{
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    const body = JSON.stringify({name, surname, email, password})
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const mode = 'no-cors'
    const url = 'http://localhost:8080/users'

    return fetch(url, { method, body, headers, mode })
        .then(res =>res.json())
        .then(({status, body}) => {
            if(status !== 201){
                const { error } = JSON.parse(body)

                throw new Error(JSON.parse(body))
            } 
            return
        })
}


        // .then(res => res.json())

// var url = 'https://example.com/profile';
// var data = {username: 'example'};

// fetch(url, {
//   method: 'POST', // or 'PUT'
//   body: JSON.stringify(data), // data can be `string` or {object}!
//   headers:{
//     'Content-Type': 'application/json'
//   }
// }).then(res => res.json())
// .catch(error => console.error('Error:', error))
// .then(response => console.log('Success:', response));






/* function registerUser(name, surname, email, password, callback) {
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)

    call('POST',
        'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 201)
                callback()
            else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
} */