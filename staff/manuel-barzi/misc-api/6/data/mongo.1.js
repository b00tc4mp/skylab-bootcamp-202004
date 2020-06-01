const mongodb = require('mongodb')

let connection

module.exports = {
    connect(url) {
        // if (connection) {
        //     return Promise.resolve(connection)
        // } else {
        //     return mongodb.connect(url, { useUnifiedTopology: true })
        //         .then(_connection => connection = _connection)
        // }        

        return connection ?
            Promise.resolve(connection)
            :
            mongodb.connect(url, { useUnifiedTopology: true })
                .then(_connection => connection = _connection)
    },

    disconnect() {
        return connection.close().then(() => connection = undefined)
    },

    ObjectId: mongodb.ObjectId
}
