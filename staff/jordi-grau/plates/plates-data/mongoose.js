const mongoose = require('mongoose')

const { types: {ObjectId}, connect, disconnect} = mongoose

module.exprots = {
    connect(url){
        return connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    },

    disconnect,

    ObjectId
    
}
