const fs = require('fs')
const path = require('path')
const findContact=require("./find-contact-by-filter")
function retrieveContact(contactId,callback){
    if(typeof contactId!=="string") throw new TypeError(contactId+" is not a string")
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function")

    findContact({id:contactId},(error,contacts)=>{
        if(error) return callback(error);
        if(contacts.length===0) return callback(new Error(`contact with id: ${contactId} doesn't exist`));
        callback(null ,contacts[0]);
    })
}
module.exports=retrieveContact;