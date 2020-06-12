require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, SECRET, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const path = require('path')
const { Logger, singletonFileLogger, singletonConsoleLogger } = require('./logger')
const file = singletonFileLogger(path.join(__dirname, 'server.log'))
const console = singletonConsoleLogger()
file.level = Logger.WARN
console.level = Logger.DEBUG

const express = require('express')
const { 
    registerUser, 
    authenticateUser, 
    retrieveUser,
    updateUser,
    searchUser,
    findBook,
    createBook,
    deleteBook,
    searchBook,
    retrieveBook,
    acceptedShareBook,
    calculateDistanceBook,
    sendMessage,
    retrieveMessages,
    deleteRecievedMessages,
    listMyBooks,
    listShareBooks,
    addRequestedBook,
    retrieveRequestedBooks,
    toggleFollowing,
    retrieveFollowing,
    updateCoordinates,
    retrieveCoordinates,
    addScore,
    retrieveAvgScore
} = require('books-server-logic')

const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { handleError } = require('./helpers')
const { utils: { jwtPromised } } = require('books-commons')
const { jwtVerifierExtractor, cors } = require('./middleware')
const { mongoose } = require('books-data')

console.debug('starting server')

try {
    console.debug('connecting to database')

    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.info(`connected to database ${MONGODB_URL}`)
            const app = express()
            const parseBody = bodyParser.json()
            const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)
            app.use(cors)


            app.post('/users/register', parseBody, (req, res) => {
                const { body: { name, surname, email, password } } = req

                try {
                    registerUser(name, surname, email, password)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.post('/users/authenticate', parseBody, (req, res) => {
                const { body: { email, password } } = req

                try {
                    authenticateUser(email, password)
                        .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
                        .then(token => res.send({ token }))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('/users/:query?', verifyExtractJwt,(req, res) => {
                try {
                    const { params: { query }, payload:{sub:userId} } = req

                    retrieveUser(query || userId)
                        .then(user => res.send(user))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.patch('/users/update',verifyExtractJwt,parseBody,(req,res)=>{
                const {payload:{sub:userId}, body:{name,surname,email,password}} =req

                try{
                    updateUser(userId,name,surname,email,password)
                        .then(()=> res.status(200).send())
                        .catch(error => handleError(error, res))
                }catch(error){
                    handleError(error, res)
                }
            })

            app.get('/users/search/:query?',parseBody, (req, res) => { 
                const { params: { query:query}} = req

                try {
                   searchUser(query)
                        .then((user) => res.status(201).send(user))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.patch('/users/coordinates',verifyExtractJwt,parseBody,(req,res)=>{
                const { payload: { sub: userId },body:{latitude,longitude}} = req
                
                try {
                    updateCoordinates(userId,latitude,longitude)
                        .then(() => res.status(200).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('/users/coordinates/retrieve',verifyExtractJwt,(req,res)=>{
                const { payload: { sub: userId }} = req
        
                try {
                    retrieveCoordinates(userId)
                        .then((body) => res.status(201).send(body))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })


            app.get('/books/find/:query?', (req, res) => {
                const { params: { query:query} } = req
                
                try {
                    findBook(query)
                        .then(book => res.status(201).send(book))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.post('/books/create', verifyExtractJwt ,parseBody, (req, res) => { 
                const { body: {title,image,description,barCode} ,payload: { sub: userId },} = req

                try {
                    createBook(userId,title,image,description,barCode)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.delete('/books/delete/:query?', verifyExtractJwt , (req, res) => { 
                const { params:{query} ,payload: { sub: userId }} = req

                try {
                    deleteBook(userId,query)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('/books/search/:query?', verifyExtractJwt ,parseBody, (req, res) => { 
                const { params: { query:query} ,payload: { sub: userId }} = req

                try {
                   searchBook(userId,query)
                        .then((book) => res.status(201).send(book))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })
            app.get('/books/:bookId?',parseBody, (req, res) => { 
                const { params: { bookId:query} } = req

                try {
                   retrieveBook(query)
                        .then((book) => res.status(201).send(book))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.patch('/books/share/accepted', verifyExtractJwt ,parseBody, (req, res) => {
                const { body: {newUserId,bookId} ,payload: { sub: userId }} = req

                try {
                   acceptedShareBook(userId, newUserId, bookId)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('/books/share/list',verifyExtractJwt,(req,res)=>{
                const {payload:{sub:userId}} = req
                try {
                    listShareBooks(userId)
                         .then((book) => res.status(200).send(book))
                         .catch(error => handleError(error, res))
                 } catch (error) {
                     handleError(error, res)
                 }
            })
           
            app.post('/books/add/distance', verifyExtractJwt ,parseBody, (req, res) => {
                const { body: { newUserId,bookId } ,payload: { sub: userId }} = req

                try {
                    calculateDistanceBook(userId, newUserId, bookId)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })
       
            app.post('/books/message/send', verifyExtractJwt ,parseBody, (req, res) => {
                const { body: { toUserId,bookId,textMessage } ,payload: { sub: userId }} = req

                try {
                    sendMessage(userId, toUserId, bookId, textMessage)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('/books/messages/retrieve', verifyExtractJwt ,parseBody, (req, res) => {
                const { payload: { sub: userId }} = req

                try {
                    retrieveMessages(userId)
                        .then((messages) => res.status(200).send(messages))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.delete('/books/messages/delete/:messageId',verifyExtractJwt,(req,res)=>{
                const { payload: { sub: userId } , params:{messageId}} = req

                try {
                    debugger
                    deleteRecievedMessages(userId,messageId)
                        .then(()=>res.status(200).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('/books/list/mybooks', verifyExtractJwt ,(req, res) => {
                const { payload: { sub: userId } } = req

                try {
                    listMyBooks(userId)
                        .then((books) => res.status(201).send(books))
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

        
            app.post('/books/requested/add/:bookId?', verifyExtractJwt ,(req, res) => {
                const { payload: { sub: userId },params:{bookId}} = req

                try {
                    addRequestedBook(userId,bookId)
                        .then(() => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })
            app.get('/books/requested/retrieve', verifyExtractJwt ,(req, res) => {
                const { payload: { sub: userId }} = req

                try {
                    retrieveRequestedBooks(userId)
                        .then((body) => res.status(201).send())
                        .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })
            
            app.post('/books/following/toggle',verifyExtractJwt,parseBody,(req,res)=>{
                
                const { payload: { sub: userId }, body:{followingUserId}} = req
                try {
                    toggleFollowing(userId,followingUserId)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })
            app.get('/books/following/retrieve',verifyExtractJwt,(req,res)=>{
                
                const { payload: { sub: userId }} = req
                try {
                    retrieveFollowing(userId)
                    .then((body) => res.status(200).send(body))
                    .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.patch('/books/score/add',verifyExtractJwt,parseBody,(req,res)=>{
                const { payload: { sub: userId }, body:{recievedPointUserId, points}} = req
                
                try {
                    addScore(userId, recievedPointUserId, points)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })
            app.get('/books/score/retrieve/:query?',parseBody,(req,res)=>{
                const { params: { query:query} } = req
                
                try {
                    retrieveAvgScore(query)
                    .then((body) => res.status(200).send(body.toString()))
                    .catch(error => handleError(error, res))
                } catch (error) {
                    handleError(error, res)
                }
            })

            app.get('*', (req, res) => {
                res.status(404).send('Not Found :(')
            })

            app.listen(PORT, () => console.info(`server ${name} ${version} running on port ${PORT}`))

            let interrupted = false

            process.on('SIGINT', () => {
                if (!interrupted) {
                    interrupted = true

                    console.debug('stopping server')

                    console.debug('disconnecting database')

                    mongoose.disconnect()
                        .then(() => console.info('disconnected database'))
                        .catch(error => file.error('could not disconnect from mongo', error))
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