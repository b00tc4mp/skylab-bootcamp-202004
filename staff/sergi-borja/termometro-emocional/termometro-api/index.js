request('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { name, version } = require('./package.json')
const { mongoose } = require('termometro-data')

const { api } = require('./routes')

try {
    mongoose.connect(MONGODB_URL)
        .then(()=>{
            const app = express()

            app.use('/api', api)
            
            app.get('*', (req, res) => {
                res.status(404).send('Not Found :(')
            })
            
            /*WHY THIS THING DOWN HERE*/
            app.listen(PORT, () => console.info(`server ${name} ${version} running on port ${PORT}`))


       })
} catch(error) {
    console.error('could not connect to mongo', error)
}