// TODO list contacts in a column
// Name     Surname     E-mail      Phone       Age     Birthdate
// a        b           e@mail.com  123         30      1-1-1
// ...
// - read all json files from data
// - output each file info in a row

const fs = require('fs')
const path = require('path')

function listContacts(callback) {

    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
     
        files.forEach((file) => {
            
            fs.readFile(path.join(__dirname,'..','data',file), (error, data) => {
                if(error) console.error(error)
                debugger
                data = JSON.parse(data)
                
                console.log(data)
                const {name,surname,phone, email, age, birthdate, country} = data



                //console.log(`${name}\t${surname}\t${phone}\t${ email}\t${age}\t${birthdate}\t${country}`)
            })
            if(count < files.length) {
                callback(undefined, data)
            }
        })
    })
}
module.exports = listContacts



