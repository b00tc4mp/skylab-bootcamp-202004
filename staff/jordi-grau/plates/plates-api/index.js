require('dotenv').config()
debugger
const { argv: [ , , PORT_CLI], env: {PORT: PORT_ENV, SECRET, MONGODB_URL} } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require ('express')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log(`Connected to ${MONGODB_URL}`)
    })

    .catch(error => {
        console.error('Unable to connect mongo', error)
    })