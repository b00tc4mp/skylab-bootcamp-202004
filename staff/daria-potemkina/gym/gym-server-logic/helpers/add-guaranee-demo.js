require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose } = require('misc-data')
const addGuarantee = require('./add-guarantee')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
        addGuarantee('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU0YjQzZmMwYWU4ZGEzMzY5YzlhOTciLCJpYXQiOjE1OTI1MDc5MjEsImV4cCI6MTU5MjU5NDMyMX0.xGLKmR8HExuOb2zcUz34ucAVHmoOcjGIXN1PNg6f8SI')
                .then((results) => console.log(results))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })

