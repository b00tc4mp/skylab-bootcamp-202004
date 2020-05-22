const login = require('./login')

login('sergi@mail.com','123123123',(error, id) => {
    if (error) return console.error(error)

    console.log(id)
})