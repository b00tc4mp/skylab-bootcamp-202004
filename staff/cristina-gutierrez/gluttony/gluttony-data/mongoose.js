const { connect, disconnect } = require("mongoose")

module.exports = {
    connect(url) {
        return connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
    },

    disconnect
}