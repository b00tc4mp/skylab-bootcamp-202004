const mongodb = require('mongodb');

let {ObjectId, connection} = mongodb

module.exports = {
    connect(url) {
        return connection ? 
            Promise.resolve(connection) 
            :
            mongodb.connect(url, { useUnifiedTopology: true})
                .then(_connection => connection = _connection)
    },
    disconnect(){
        return connection.close()
                .then(()=>connection = undefined)

    },
    
    ObjectId

}