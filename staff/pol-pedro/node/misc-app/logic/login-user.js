const fs= require("fs")
const path=require("path")
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/polyfills/json')
const { find } = require('../data/users')
module.exports=(email, password, callback)=>{

    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    const data = path.join(__dirname, '..', 'data')
        
    find({email}, (error,[user]) => {

        if(error) return callback(error)

        if(!user)  return callback(new Error('This email dosent exist'))

        if(password === user.password) callback(null, user.id)
    })
}