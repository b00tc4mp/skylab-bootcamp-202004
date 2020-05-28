const fs = require('fs')
const path = require('path')
const { find } = require('../data/contacts')

module.exports = (userId, callback) => {

find({userId}, (error,results) =>{

    if(error) throw error

    if(!results) return callback(new Error('No results found'))

    callback(null, results)

})
    
}