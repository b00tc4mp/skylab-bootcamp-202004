const fs = require('fs')
const path = require('path')
require('../utils/string')
const findSticky=require("../logic/find-sticky-by-filter")
const findUser=require("../logic/find-user-by-filter")

function listStickies(userId,callback){
    if(typeof userId!=="string") throw new TypeError(userId+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");

    //Check user exist
    findUser({id:userId},(error,[user])=>{
        if(error) return callback(error);
        if(!user) return callback(new Error(`user with id: ${userId} doesn't exist`));

        findSticky({userId},(error,stickies)=>{
            if(error) return callback(error)
            callback(null,stickies)
        })
    })
}
module.exports=listStickies;