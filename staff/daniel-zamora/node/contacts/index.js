const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('name?', (name) => {
    rl.question('surname?', (surname)=> {
        rl.question('phone?', (phone)=> {
            rl.question('e-mail?', (email)=> {
                rl.question('web?', (web)=> {
                    rl.question('instagram?', (instagram) => {
                        rl.question('facebook?', (facebook)=> {
                            rl.question('twitter?', (twitter)=> {
                                rl.question('ticktok', (ticktok)=> {
                                    let valueJson={
                                        name, 
                                        surname, 
                                        phone, 
                                        email,
                                        web,
                                        instagram,
                                        facebook,
                                        twitter,
                                        ticktok
                                    }
                                    console.log(valueJson)

                                    fs.writeFile(`${valueJson.name}-${valueJson.surname}.json`, JSON.stringify(valueJson, null, 4), error => {
                                        if(error) throw error
                                    })

                                    rl.close()
                                })
                            })
                        })
                    })
                })
            }) 
        })
    })
})






