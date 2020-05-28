const fs = require('fs')
const path = require('path')
const { find } = require('../data/stickies')

module.exports = (userId, callback) => {

    find({userId}, (error,results) =>{

        if(error) throw error

        if(!results) return callback(new Error('No stickies found'))

        callback(null, results)

    })
    
}