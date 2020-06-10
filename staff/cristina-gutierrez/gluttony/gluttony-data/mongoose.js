const mongoose = require("mongoose")

const { Types: { ObjectId }, connect, disconnect } = mongoose

module.exports = {
    connect(MONGODB_URL) {
        return connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    },

    disconnect,

    ObjectId
}