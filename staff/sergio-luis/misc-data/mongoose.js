const mongoose = require ('mongoose')

const {Schema:{ObjectId}, connect,disconnect } = mongoose

module.exports = {
    connect (url) {
        return connect(url , {useUnifiedTopology: true, useNewUrlParser: true})
    },

    disconnect,

    ObjectId
}