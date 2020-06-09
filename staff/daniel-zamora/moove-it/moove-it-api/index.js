 require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const path = require('path')
const { Logger, singletonConsoleLogger, singletonFileLogger } = require('./logger')
const file = singletonFileLogger(path.join(__dirname, 'server.log'))
const console = singletonConsoleLogger()
file.level = Logger.WARN
console.level = Logger.DEBUG

const { api } = require('./routes')

const express = require('express')
const { name, version } = require('./package.json')
const { mongoose } = require('moove-it-data')
const { cors } = require('./middlewares')

console.debug('Starting server')

try{
    console.debug('connecting to database')

    mongoose.connect(MONGODB_URL)
        .then( () => {
            console.info(`connected to database ${MONGODB_URL}`)

            const app = express()

            app.use(cors)

            app.use('./api', api)

            app.get('*', (req, res) => {
                res.status(404).send('Not Found :(')
            })

            app.listen(PORT, () => console.info(`server ${name} ${version} running on port ${PORT}`))

            let interrupted = false

            proccess.on('SIGINT', () => {
                if(!interrupted) {
                    interrupted = true

                    console.debug('Stopping server')

                    console.debug('disconnecting database')

                    mongoose.disconnect()
                        .then( () => console.info('disconnected database'))
                        .catch(error => file.error('could not disconnect from mongo', error))
                        .finally(() => {
                            console.info(`server ${name} ${version} stopped`)

                            setTimeout(() => {
                                file.close()

                                setTimeout(()=> {
                                    proccess.exit()
                                },500)
                            },500)
                        })
                }
            })
        })
        .catch(error => {
            file.error('could not connect to mongo', error)
        })

} catch (error){
    file.error(error)
}


        // app.get('/users/search/q=:query', verifyExtractJwt, (req, res) => { debugger
        //     try {
        //         const { params: { query }, payload: {sub: id} } = req

        //         const queryObject = {}
        //         query.split('&').forEach(element => {
        //             const [key, value] = element.split('=')
        //             queryObject[key] = value
        //         })

        //         searchUsers(id, queryObject)
        //             .then(users => res.status(200).send(users))
        //             .catch(error => handleError(error, res))

        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })

        // app.delete('/users/delete', parseBody, verifyExtractJwt, (req, res) => {

        //     try {
        //         const { payload: {sub: id} } = req

        //         const { body: { email, password } } = req

        //         unregisterUser(email, password, id)
        //             .then(()=>res.status(204).send())
        //             .catch(error => handleError(error, res))

        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })


        // app.patch('/users/cart', parseBody, verifyExtractJwt, (req, res) => {
        //     try {
        //         const { payload: {sub: id} } = req

        //         const { body: { productId, quantity } } = req

        //         updateCart(id, productId, quantity) 
        //             .then(()=> res.status(204).send())
        //             .catch(error => handleError(error, res))

        //     } catch (error) {
        //         handleError(error, res)
        //     }
        // })


        
    