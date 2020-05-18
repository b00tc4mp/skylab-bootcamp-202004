// const assert = require('assert')
// const listContacts = require('./list-contacts')
// const path = require('path')
// const { random } = Math
// const fs = require('fs')

// {
//     let numOfFilesBefore 
//     let numOfFilesAfter 

//     fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
//         assert(error === null)

//         numOfFilesBefore = files.length
//     })

//     const name = `name-${random()}`
//     const surname = `surname-${random()}`
//     const email = `e-${random()}@mail.com`

//     const id = `${Date.now()}`

//     const file = `${id}.json`

//     function replacer(key, value) {
//         if (typeof value === 'string')
//             return value.toUpperCase()

//         return value;
//     }

//     fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify({name, surname, email}, replacer, 4), error => {
//         assert(error === null)
//     })

//     listContacts((error, data) => {
//         assert(error === undefined)
//         assert(typeof data === 'object')
//     })

//     fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
//         assert(error === null)
//         numOfFilesAfter = files.length
//         assert(numOfFilesAfter === numOfFilesBefore+1)
//         assert(files.includes(file))
//     })

// }

