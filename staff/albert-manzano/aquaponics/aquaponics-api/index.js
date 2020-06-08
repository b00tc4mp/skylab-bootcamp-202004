require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const path = require('path')
const { Logger, singletonFileLogger, singletonConsoleLogger } = require('./logger')

const file = singletonFileLogger(path.join(__dirname, 'server.log'))
const console = singletonConsoleLogger()
file.level = Logger.WARN
console.level = Logger.DEBUG

const { api } = require('./routes')

const express = require('express')

const { name, version } = require('./package.json')
const { cors } = require('./middlewares')
const { mongoose } = require('aquaponics-data')

console.debug('starting server')

// user
//register
//retrieve
//update
//revoke
//delete
// confirm
//retrieve all


//arduino
//retrieve tmp
//retrive ph
//log temp
//log ph
// retrievelasttemp
// retrieve last ph


//event
//create event
//update event
//delete event
//retrive event
