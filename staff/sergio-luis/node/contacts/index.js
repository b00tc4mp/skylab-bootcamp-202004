const readline = require('readline');
const fs = require('fs')

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let dates;

prompt.question('name? ', name => {
    prompt.question('surname?', surname => {
        prompt.question('phone?', phone => {
            prompt.question('e-mail?', email => {
                prompt.question('web?', web => {
                    dates = {
                        name : name,
                        surname: surname,
                        phone:phone,
                        email:email,
                        web:web
                    }                                           
                    fs.writeFile(`${name.toLowerCase()}-${surname.toLowerCase()}.json`, JSON.stringify(dates,null,4), error => { //(dates,null,4) -for the format of json
                        if (error) throw error
                    })
                    prompt.close()
                })
            })
        })
    })
})



// 
//question

// branch feature/node
// working directory staff/<name>/node
// SUB-CHL contacts
// folder contacts
// TODO implement a script index.js that asks contact information, and when ending, it saves the data in a file.

// example:
// $ node .
// name? Hector
// surname? Gracia
// phone? 678123456
// e-mail? hector.gracia@mail.com
// web? https://hector-chulo.com
// instagram? hectorchulo
// facebook? hector.chulo
// twitter? hector.chulo5
// fwitter? hector.chulo10
// tiktok? hector.tik
// contact saved
// this creates a file named hector-gracia.json with the contents as follows:

// {
// "name": "Hector",
// "surname": "Gracia",
// ...
// }