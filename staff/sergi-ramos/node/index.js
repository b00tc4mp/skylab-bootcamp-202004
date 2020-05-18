const rl = require('readline')
const fs = require('fs')

const contact = {}
let count = 0
const questions = ['name', 'surname', 'phone', 'web', 'instagram', 'facebook','twitter','fwitter']
function promptContact(quesitons) {
questions.forEach((question) =>{
    prompt.question(question , (question) => {
        contact[question] = question
})
prompt.close
})

const prompt = rl.createInterface({
    input: process.stdin,
    output: process.stdin
})
prompt.question('name: ', (name) => {
    contact.name = name
    prompt.question('surname: ', (surname) => {
        contact.surname = surname
        prompt.question('phone: ', (phone) => {
            contact.phone = phone
            prompt.question('web: ', web => {
                contact.web = web
                prompt.question('instagram: ', (instagram) => {
                    contact.instagram = instagram
                    prompt.question('facebook: ', (facebook) => {
                        contact.facebook = facebook
                        prompt.question('twitter: ', twitter => {
                            contact.twitter = twitter
                            prompt.question('fwitter: ', fwitter => {
                                contact.fwitter = fwitter
                                console.log('Contact saved')

                                    while (fs.existsSync(`./${contact.name}-${contact.surname}${count?count:''}.json`)) {
                                        count++
                                        console.log('funciona')
                                        // fs.writeFile(`${contact.name}-${contact.surname}.json`, JSON.stringify(contact), error => {
                                        //     console.log(error)
                                    }
                                    !count ? 
                                    fs.writeFile(`${contact.name}-${contact.surname}.json`, JSON.stringify(contact), error => {
                                        console.log(error)
                                    })
                                    : 
                                    fs.writeFile(`${contact.name}-${contact.surname}${count}.json`, JSON.stringify(contact), error => {
                                        console.log(error)
                                    })
                                    prompt.close()
                                })
                        })
                    })
                })
            })
        })
    })
})


