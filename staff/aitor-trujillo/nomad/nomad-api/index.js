require('dotenv').config()

const { PORT, MONGODB_URL, SECRET } = process.env

const path = require('path')
const bodyParser = require('body-parser')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createWorkspace,
    retrieveWorkspaceById,
    retrieveByLocation,
    searchWorkspaces,
    toggleFavorites,
    searchFavorites,
    retrieveFavorites,
    retrieveUserWorkspaces,
    uploadImage,
    uploadUserImage
} = require('nomad-server-logic')
const { mongoose } = require('nomad-data')
const { jwtVerifierExtractor, cors } = require('./middlewares')
const { handleError } = require('./helpers')
const jwtPromised = require('./helpers/jwt-promised')
const Busboy = require('busboy')

const express = require('express')
const placeReview = require('nomad-server-logic/place-review')
const deleteWorkspaceById = require('nomad-server-logic/delete-workspace-by-id')
const retrieveUserReviews = require('nomad-server-logic/retrieve-user-reviews')



mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`connected to database ${MONGODB_URL}`)

        const app = express()

        const parseBody = bodyParser.json()

        const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

        //app.use(cors)
        app.use(express.static('public'))



        // USERS ============================

        app.post('/users', parseBody, (req, res) => {
            const { body: { name, surname, email, password } } = req
            try {
                registerUser(name, surname, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/users/auth', parseBody, (req, res) => {

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

        app.get('/users', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId } } = req

                retrieveUser(userId)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/users/upload/', verifyExtractJwt, (req, res) => {

            try {
                const { payload: { sub: userId } } = req
                const busboy = new Busboy({ headers: req.headers })

                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                    filename = `${userId}`
                    uploadUserImage(userId, file, filename)
                })

                busboy.on('finish', () => {
                    res.send('uploaded');
                })

                req.pipe(busboy)


            } catch (error) {
                handleError(error, res)
            }
        })

        // WORKSPACES =======================

        app.post('/workspaces', parseBody, verifyExtractJwt, (req, res) => {

            try {
                const { payload: { sub: userId }, body: workspace } = req

                createWorkspace(userId, workspace)
                    .then(({ id }) => res.status(201).send({ id }))
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        app.post('/upload/:workspaceId', verifyExtractJwt, (req, res) => {

            try {

                const { payload: { sub: userId }, params: { workspaceId } } = req
                const busboy = new Busboy({ headers: req.headers })

                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                    filename = `${workspaceId}`
                    uploadImage(userId, workspaceId, file, filename)
                })

                busboy.on('finish', () => {
                    res.send('uploaded');
                })

                req.pipe(busboy)


            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/workspaces/:workspaceId', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { workspaceId } } = req

                retrieveWorkspaceById(workspaceId)
                    .then(result => res.status(201).send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.delete('/workspaces/:workspaceId', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { workspaceId } } = req

                deleteWorkspaceById(userId, workspaceId)
                    .then(() => res.status(200).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })
        app.get('/workspaces/user/get', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId } } = req

                retrieveUserWorkspaces(userId)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/workspaces/location/:lat/:lon/', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { lat, lon } } = req

                retrieveByLocation(userId, [Number(lon), Number(lat)])
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })
        app.get('/workspaces/location/:lat/:lon/:filter', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { lat, lon, filter } } = req

                retrieveByLocation(userId, [Number(lon), Number(lat)], filter)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/workspaces/search/:query', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { query } } = req

                searchWorkspaces(query)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        // FAVORITES ========================

        app.post('/favorites/add/:workspaceId', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { workspaceId } } = req

                toggleFavorites(userId, workspaceId)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/favorites/', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId } } = req

                retrieveFavorites(userId)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/favorites/search/:query', verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, params: { query } } = req

                searchFavorites(userId, query)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })

        // REVIEWS ==========================

        app.post('/reviews', parseBody, verifyExtractJwt, (req, res) => {
            try {
                const { payload: { sub: userId }, body: { workspaceId, stars, text } } = req

                placeReview(userId, workspaceId, stars, text)
                    .then(() => res.status(201).send())
                    .catch(error => handleError(error, res))

            } catch (error) {
                handleError(error, res)
            }
        })

        app.get('/reviews/user/get', verifyExtractJwt, (req, res) => {

            try {
                const { payload: { sub: userId } } = req
                retrieveUserReviews(userId)
                    .then(result => res.send(result))
                    .catch(error => handleError(error, res))
            } catch (error) {
                handleError(error, res)
            }
        })


        // OTHERS =========================

        app.get('*', (req, res) => {
            res.status(404).send('Not Found :(')
        })

        app.listen(PORT, () => console.log(`server running on port ${PORT}`))

        process.on('SIGINT', () => {
            mongoose.disconnect()
                .then(() => console.log('\ndisconnected mongo'))
                .catch(error => console.error('could not disconnect from mongo', error))
                .finally(() => {
                    console.log(`mongo stopped`)

                    process.exit()
                })
        })
    })
    .catch(error => {
        console.error('could not connect to mongo', error)
    })



