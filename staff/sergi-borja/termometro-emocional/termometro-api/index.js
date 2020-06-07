request('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { mongoose } = require('termometro-data')

try {
    mongoose.connect(MONGODB_URL)
        .then(()=>{
            const app = express()

            const parseBody = bodyParser.json()

             
       })
} catch {

}