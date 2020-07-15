const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
const findUser=require("../logic/find-user-by-filter")
const findContact=require("../logic/find-contact-by-filter")
/**
 * Creates a new contact and asociates it with an user
 * @param {string} userId id of the user that is saving the contact
 * @param {object} contact object with the parameters the contact will have
 * @param {function} callback funciton called after finisihing. returns the possible errors or the id of the contact created
 * @throws {TypeError} throws an error if the userId is not a string
 * @throws {TypeError} throws an error if the contact is not an object
 * @throws {TypeError} throws an error if the callback is not a function
 * @throws {Error} throws an error if name and surname are not specified or if email and phone are not specified
 * @throws {TypeError} thwors an error if the parameters of the contact are not strings
 */
const addContact=(userId,contact, callback) => {
    if(typeof userId!=="string") throw new TypeError(userId+" is not a string");
    if(typeof contact !== 'object') throw new TypeError(`${contact} is not an object`);
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");

    const { name, surname, email, phone, birthdate, country } = contact

    if((name===undefined)&&(surname===undefined)){
        throw new Error("name and surname not defined");
    }
    if((email===undefined)&&(phone===undefined)){
        throw new Error("email and phone not defined");
    }
    if (name)
        String.validate.notVoid(name)

    if (surname)
        String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }
    if (phone)
        String.validate.notVoid(phone)

    if (birthdate) {
        String.validate.notVoid(birthdate)
        //Date.validate(birthdate) // TODO create this polyfill
    }
    if (country)
        String.validate.notVoid(country)

    const id = uid()

    const file = `${id}.json`
    //Comprueba que el usuario que guarda el contacto está registrado
    findUser({id:userId},(error,[user])=>{
        if(error) return callback(error);
        if(!user) return callback(new Error(`user with id: ${userId} doesn't exist`));
        contact.userId=user.id;
        contact.id=id;
        //Comprueba que ese contacto no se ha heho antes
        findContact({email,userId},(error,contacts)=>{
            if(error) return callback(error);
            if(contacts.length>0) return callback(Error("contact already in the server"))
            findContact({phone,userId},(error,contacts)=>{
                if(error) return callback(error);
                if(contacts.length>0) return callback(Error("contact already in the server"))
                fs.writeFile(path.join(__dirname,"..","data","contacts",file),JSON.stringify(contact),error=>{
                    if(error) return callback(error);
                    callback(null,id)
                })
            })
        })
    })
}
module.exports = addContact;