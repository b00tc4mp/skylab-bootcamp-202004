const { users, contacts, stickies } = require('.')

false && users.deleteMany(error => {
    if (error) throw error

    contacts.deleteMany(error => {
        if (error) throw error

        stickies.deleteMany(error => {
            if (error) throw error

            users.create({
                name: 'Pepito',
                surname: 'Grillo',
                email: 'pepigri@mail.com',
                password: '123123123'
            }, (error, userId) => {
                if (error) throw error

                contacts.create({
                    name: 'Fula',
                    surname: 'Nito',
                    user: userId
                }, console.log)
            })
        })
    })
})

// callback way (the old-fashioned way)

false && users.find({ name: 'Manuel' }, (error, results) => {
    if (error) return console.error(error)

    console.log(results)
})

// promise way (the modern way)

users.find({ name: 'Manuel' })
    .then(console.log)
    .catch(console.error)