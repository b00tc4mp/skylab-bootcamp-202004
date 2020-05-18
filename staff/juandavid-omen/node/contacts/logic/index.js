const readline = require('readline')

const fs = require('fs')

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let dates;

prompt.question('name?', name => {
    prompt.question('surname?', surname => {
        prompt.question('phone?', phone => {
            prompt.question('email?', email => {
                prompt.question('web?', web => {
                    dates = {
                        name: name,
                        surname: surname,
                        phone: phone,
                        email: email,
                        web: web
                    }
                    fs.writeFile(`${name.toLowerCase()}-${surname.toLowerCase()}.json`, JSON.stringify(dates, null, 4), error => {
                        if (error) throw error
                    })

                    prompt.close()
                })
            })
        })
    })
})