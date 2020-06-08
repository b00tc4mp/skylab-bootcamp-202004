require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const { api } = require('./routes')

const express = require('express')

const { name, version } = require('./package.json')
const { cors } = require('./middlewares')
const { mongoose } = require('gym-data')

try{
    mongoose.connect(MONGODB_URL)
    .then(() => {
        const app = express()

        app.use(cors)

        app.use('/api', api)

        app.get('*', (req, res) => {
            res.status(404).send('Not Found')
        })

        app.listen(PORT, () => console.log(`server ${name} ${version} running on port ${PORT}`))

        let interrupted = false

        process.on('SIGINT', () => {
            if (!interrupted) {
                interrupted = true

                console.log('stopping server')

                console.log('disconnecting database')

                mongoose.disconnect()
                    .then(() => console.log('disconnected database'))
                    .catch(error => console.log('could not disconnect from mongo', error))
                    .finally(() => {
                        console.log(`server ${name} ${version} stopped`)

                        setTimeout(() => {
                            console.log()

                            setTimeout(() => {
                                process.exit()
                            }, 500)
                        }, 500)
                    })
            }
        })
    })
    .catch(error => {
        console.error('could not connect to mongo', error)
    })
}catch (error){
    console.log(error)
}
