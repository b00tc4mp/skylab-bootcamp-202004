const fs = require('fs');
const path = require('path');
require("../utils/polyfills/string");
const Email = require("../utils/email");
const uid = require("../utils/uid");
require("../utils/polyfills/function")
debugger

function addContact(contact,userId, callback) {
  if (typeof contact !== "object")
    throw new TypeError(`${contact} is not an object`);

  Function.validate(callback)
  String.validate(userId)

  const { name, surname, email, phone, birth, country} = contact;

  if (name) String.validate.notVoid(name);

  if (surname) String.validate.notVoid(surname);

  if (email) {
    String.validate.notVoid(email);
    Email.validate(email);
  }

  if (phone) String.validate.notVoid(phone);

  if (birth) {
    String.validate.notVoid(birth);
    //Date.validate(birth) // TODO create this polyfill
  }

  if (country) String.validate.notVoid(country);

  fs.readFile(path.join(__dirname, "..", "data", "users", `${userId}.json`),(error, json) => {debugger
    if(error) return callback(new Error('user dont exist'))
  const user = JSON.parse(json)
  if (user.id === userId) {debugger 
  debugger
  const id = uid()
  contact.userId = userId
  const file = `${id}.json`;
  contact.contactId = id
  fs.writeFile(path.join(__dirname, '..', 'data','contacts',file),JSON.stringify(contact, null, 4),
  (error) => {if (error) return callback(error);
    callback(null, contact.contactId);
  })
  }else throw new Error('user id dosnt exist')
  
    
      
    
  
  })

}
module.exports = addContact
