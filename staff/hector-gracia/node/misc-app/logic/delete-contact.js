const fs = require('fs')
const path = require('path')
require('../utils/string')
const findContact=require("../logic/find-contact-by-filter")

function deleteContact(contactId,callback){
    if(typeof contactId!=="string") throw new TypeError(contactId+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");

    //Comprueba que el contact existe
    //Lo borra
    findContact({id:contactId},(error,contacts)=>{
        if(error) return callback(error);
        if(!contacts.length) return callback( new Error(`contact with id: ${contactId} doesn't exist`));
        fs.unlink(path.join(__dirname,"..","data","contacts",`${contacts[0].id}.json`),()=>{
            callback(null,{message:"OK"});
        })
    })
}
module.exports=deleteContact;