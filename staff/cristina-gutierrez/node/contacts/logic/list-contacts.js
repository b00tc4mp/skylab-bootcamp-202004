// TODO list contacts in a column
// Name     Surname     E-mail      Phone       Age     Birthdate
// a        b           e@mail.com  123         30      1-1-1
// ...
// - read all json files from data
// - output each file info in a row

const readline = require("readline");
const fs = require("fs");

function listContacts() {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    
}