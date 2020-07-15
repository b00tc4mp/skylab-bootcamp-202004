const fs = require('fs')
const path = require('path')
const findUser= require("./find-user-by-filter")
const findContact=require("./find-contact-by-filter")

const listContacts=(userId,callback)=>{
    if(typeof userId!=="string") throw new TypeError(userId+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");
    findUser({id:userId},(error,[user])=>{
        if(error) return callback(error);
        if(!user) return callback(new Error(`user with id: ${userId} doesn't exist`));
        findContact({userId:userId},(error,contacts)=>{
            if(error) return callback(error);
            callback(null,contacts);
        })

    })
}

module.exports=listContacts;