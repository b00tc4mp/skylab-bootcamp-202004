const { connect, disconnect } = require("mongoose")

const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@gluttony-stegt.gcp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

module.exports = {
    connect() {
        return connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    },

    disconnect
}