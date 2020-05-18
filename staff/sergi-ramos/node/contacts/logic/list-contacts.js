// TODO list contacts in a column
// Name     Surname     E-mail      Phone       Age     Birthdate
// a        b           e@mail.com  123         30      1-1-1
// ...
// - read all json files from data
// - output each file info in a row

const fs = require('fs')

function listContacts() {

    fs.readdir('./data', (error, files) => {
        console.log('Name   Surname    Phone   E-mail        Age    Birthdate   Country')
        files.forEach((file) => {
            fs.readFile(`./data/${file}`, (error, data) => {
                data = JSON.parse(data)
                const {name,surname,phone, email, age, birthdate, country} = data
                console.log(`${name}\t${surname}\t${phone}\t${ email}\t${age}\t${birthdate}\t${country}`)
            })
        })
    })
}

module.exports = listContacts

// fs.readdir('.', (error, files) => {
//     if (error) throw error

//     console.log(files)
// })

