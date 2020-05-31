const mongodb = require('mongodb')

let connection

module.exports = {
    connect(url) {

        return connection ?
            Promise.resolve(connection)
            :
            mongodb.connect(url, { useUnifiedTopology: true })
                .then(_connection => connection = _connection_)
    },

    disconnect() {
        return connection.close().then(() => connection = undefined)
    },

    ObjectId: mongodb.ObjectId
}