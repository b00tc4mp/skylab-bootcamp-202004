const findContact=require("./find-contact-by-filter")
const findUser=require("./find-user-by-filter")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const addContact= require("./add-contact");

describe("addContact",()=>{
    let userName,userSurname,userEmail,userPassword,userId,contactName,contactSurname,contactEmail,contactPhone,contactBirthdate,contactCountry;
    let removeListContacts,removeListUsers;
    beforeEach(()=>{
        userName=`name-${random()}`;
        userSurname=`surname-${random()}`;
        userEmail=`${userName}@${userSurname}.com`;
        userPassword=`${random()}`;
        userId=`${Date.now()}-${random()}`;
        contactName=`name-${random()}`;
        contactSurname=`surname-${random()}`;
        contactEmail=`${contactName}@${contactSurname}.com`;
        contactPhone=`${random()}`;
        contactBirthdate=Date.now().toString();
        contactCountry=`country-${random()}`;
        removeListContacts=[];
        removeListUsers=[];
    })
    it("should add a contact to the data/contacts directory",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${userId}.json`),
        JSON.stringify({name:userName,surname:userSurname,email:userEmail,id:userId,password:userPassword}),(error)=>{
            expect(error).to.be.null;
            removeListUsers.push(`${userId}.json`);
            addContact(userId,{name:contactName,surname:contactSurname,email:contactEmail,phone:contactPhone,birthdate:contactBirthdate,country:contactCountry},
                (error,contactId)=>{
                    removeListContacts.push(`${contactId}.json`);
                    expect(error).to.be.null;
                    expect(contactId).to.exist;
                    findContact({id:contactId},(error,contacts)=>{
                        expect(error).to.be.null;
                        expect(contacts.length).to.equal(1);
                        expect(contacts[0].name).to.equal(contactName);
                        expect(contacts[0].surname).to.equal(contactSurname);
                        expect(contacts[0].email).to.equal(contactEmail);
                        expect(contacts[0].phone).to.equal(contactPhone);
                        expect(contacts[0].birthdate).to.equal(contactBirthdate);
                        expect(contacts[0].country).to.equal(contactCountry);
                        expect(contacts[0].userId).to.equal(userId);
                        findUser({id:contacts[0].userId},(error,users)=>{
                            expect(error).to.be.null;
                            expect(users.length).to.equal(1);
                            expect(users[0].name).to.equal(userName);
                            expect(users[0].surname).to.equal(userSurname);
                            expect(users[0].email).to.equal(userEmail);
                            expect(users[0].password).to.equal(userPassword);
                            done();
                        })
                    })
                })
        })
    })
    it("should throw an error if not given the required parameters",()=>{
        expect(()=>{addContact(userId,{},()=>{})}).to.throw(Error,"name and surname not defined");
        expect(()=>{addContact(userId,{name:contactName},()=>{})}).to.throw(Error,"email and phone not defined");
    })
    it("should throw an error when given invalid parameters",()=>{
        expect(()=>{addContact(undefined,{name:contactName,phone:contactPhone},()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{addContact(userId,{name:contactName,surname:123,phone:contactPhone},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addContact(userId,{name:123,phone:contactPhone},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addContact(userId,{name:contactName,email:123,phone:contactPhone},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addContact(userId,{name:contactName,phone:123},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addContact(userId,{name:contactName,birthdate:123,phone:contactPhone},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addContact(userId,{name:contactName,country:123,phone:contactPhone},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addContact(userId,undefined,()=>{})}).to.throw(TypeError,undefined+" is not an object");
        expect(()=>{addContact(userId,{name:contactName,phone:contactPhone},undefined)}).to.throw(TypeError,undefined+" is not a function");

    })
    it("should return an error if there is no user to asociate the contatct with",done=>{
        addContact(userId,{name:contactName,email:contactEmail},(error,contactId)=>{
            expect(contactId).to.be.undefined;
            expect(error).to.exist;
            expect(error.message).to.equal(`user with id: ${userId} doesn't exist`)
            done();
        })
    })
    it("should return an error if the user already have a contact with that email",done=>{
        const contact={name:contactName,surname:contactSurname,email:contactEmail,phone:contactPhone,birthdate:contactBirthdate,country:contactCountry,userId:userId};
        fs.writeFile(path.join(__dirname,"..","data","users",`${userId}.json`),
        JSON.stringify({name:userName,surname:userSurname,email:userEmail,id:userId,password:userPassword}),(error)=>{
            expect(error).to.be.null;
            removeListUsers.push(`${userId}.json`);
            fs.writeFile(path.join(__dirname,"..","data","contacts","add-contact.json"),JSON.stringify(contact),(error)=>{
                expect(error).to.be.null;
                removeListContacts.push("add-contact.json")
                addContact(userId,contact,(error,contactId)=>{
                    expect(contactId).to.be.undefined;
                    expect(error).to.exist;
                    expect(error.message).to.equal("contact already in the server")
                    delete contact.email;
                    addContact(userId,contact,(error,contactId)=>{
                        expect(contactId).to.be.undefined;
                        expect(error).to.exist;
                        expect(error.message).to.equal("contact already in the server")
                        done();
                    })
                })
            })
        })
    })
    afterEach(done=>{
        for(let i=0;i<removeListUsers.length;i++){
            fs.unlink(path.join(__dirname,"..","data","users",removeListUsers[i]),()=>{})
        }
        for(let i=0;i<removeListContacts.length;i++){
            fs.unlink(path.join(__dirname,"..","data","contacts",removeListContacts[i]),()=>{})
        }
        done()
    })
})