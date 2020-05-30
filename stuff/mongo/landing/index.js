const mongodb = require('mongodb')

mongodb.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
    .then(connection => {
        const db = connection.db('misc-api')

        const users = db.collection('users')

        return users.insertOne({ name: 'Peter', surname: 'Pan', email: 'peterpan@mail.com', password: '123123123' })
            //.then(() => users.find({}).toArray())
            //.then(users => console.log(users))
            .then(() => users.find({}))
            .then(cursor => cursor.forEach(item => console.log(item)))
            .then(() => connection.close())
    })
    .then(() => console.log('finito'))
