const  fs = require('fs');
const path = require('path');

require('../utils/string');
const Email = require('../utils/email')
const _Date = require('../utils/date') //format('30/12/2020')

function addContact(contact,callback){
    if(typeof contact !== 'object') throw new TypeError(`${contact} is no an object`);

    const {name,surname,email,phone,birth,country} = contact;

    if(name) String.validate.notVoid(name);
    if(surname) String.validate.notVoid(surname);
    if(email) Email.validate(email);
    if(phone) String.validate.notVoid(phone)

    if(birth) {
        String.validate.notVoid(birth)
        _Date.validate(birth)
    }

    if(country) String.validate.notVoid(country)

    const id = `${Date.now()}`;
    const file = `${id}.json`;

    function replacer(key, value){
        return typeof value === 'string'? value.toUpperCase() : value; 
    }


    fs.writeFile(path.join(__dirname,'..','data',file),JSON.stringify(contact,replacer,4),(error)=>{
        if(error) return callback(error)

        callback(null,id)
    })

}


module.exports = addContact