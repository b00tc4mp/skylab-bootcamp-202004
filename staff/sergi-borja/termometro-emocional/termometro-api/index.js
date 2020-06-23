require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, MONGODB_URL: MONGODB_URL  } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const { name, version } = require('./package.json')
const { mongoose } = require('termometro-data')

const { api } = require('./routes')
const { cors } = require('./middlewares')

try {
    mongoose.connect(MONGODB_URL)
        .then(()=>{
            const app = express()

            app.use(cors)
            app.use('/api', api)


            app.get('*', (req, res) => {
                res.status(404).send('Not Found :(')
            })

            app.listen(PORT, () => console.info(`server ${name} ${version} running on port ${PORT}`))

            let interrupted = false

            process.on('SIGINT',() => {
                if(!interrupted) {
                    interrupted = true

                    console.debug('stopping server')

                    console.debug('disconnecting database')

                    mongoose.disconnect()
                        .then(()=> setTimeout(() => {
                                process.exit()
                                }, 500))
                        .then(() => console.info('disconnected database'))
                //     .catch(error => file.error('could not disconnect from mongo', error))
                //     .finally(() => {
                //         console.info(`server ${name} ${version} stopped`)

                //         setTimeout(() => {
                //             file.close()

                //             setTimeout(() => {
                //                 process.exit()
                //             }, 500)
                //         }, 500)
                //     })
                 }
            })
            // .catch(error => {
            //     file.error('could not connect to mongo', error)
            // })
       })
} catch(error) {
    console.error('could not connect to mongo', error)
}