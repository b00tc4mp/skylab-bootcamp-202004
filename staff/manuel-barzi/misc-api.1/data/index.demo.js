const { users, contacts, stickies } = require('.')


users.deleteMany(error => {
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