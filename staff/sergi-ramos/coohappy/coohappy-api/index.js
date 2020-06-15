require('dotenv').config()

const { env: { PORT: PORT_ENV, MONGODB_URL } } = process
const PORT = PORT_ENV || 8080

const path = require('path')
const { Logger, singletonFileLogger, singletonConsoleLogger } = require('./logger')
const file = singletonFileLogger(path.join(__dirname, 'server.log'))

file.level = Logger.WARN
const console = singletonConsoleLogger()
console.level = Logger.DEBUG


const express = require('express')
const { name, version } = require('./package.json')
const { cors } = require('./middlewares')
const { mongoose } = require('coohappy-data')

const { api } = require('./routes')

console.debug('starting server')

try {

    mongoose.connect(MONGODB_URL)
    .then(() => {
        
        console.info(`connected to database ${MONGODB_URL}`)

        const app = express()

        app.use(cors)

        app.use('/api', api)
        
        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })
        
        app.listen(PORT, () =>  console.info(`server ${name} ${version} running on port ${PORT}`))

        let interrupted = false
        
        process.on('SIGINT', () => {
            if (!interrupted) {
                interrupted = true
                
                console.debug('stopping server')
                
                console.debug('disconnecting database')            
                
                mongoose.disconnect()
                .then(() =>console.info('disconnected database'))
                .catch(error =>  file.error('could not disconnect from mongo', error))
                .finally(() => {
                    console.info(`server ${name} ${version} stopped`)
                    
                    setTimeout(() => {
                        file.close()
                        
                        setTimeout(() => {
                            process.exit()
                        }, 500)
                    }, 500)
                })
            }
        })
        
    })
    
    .catch(error => {
        file.error('could not connect to mongo', error)
    })
} catch (error) {
   file.error(error)
}