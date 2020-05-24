const findContact=require("./find-contact-by-filter")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const listContacts=require("./list-contacts");

describe("listContacts",()=>{
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
    it("should receive all the contacts that a user has saved",done=>{
        const contact1={name:contactName,surname:contactSurname,email:contactEmail,phone:contactPhone,birthdate:contactBirthdate,country:contactCountry,userId:userId};
        const contact2={name:contactSurname,surname:contactName,email:`${contactSurname}@${contactName}.com`,phone:contactPhone+3,birthdate:contactBirthdate+1,country:contactCountry+2,userId:userId};
        fs.writeFile(path.join(__dirname,"..","data","users","list-contact.json"),
        JSON.stringify({name:userName,surname:userSurname,email:userEmail,id:userId,password:userPassword}),
        (error)=>{
            expect(error).to.be.null;
            removeListUsers.push("list-contact.json");
            fs.writeFile(path.join(__dirname,"..","data","contacts","list-contact.json"),JSON.stringify(contact1),(error)=>{
                expect(error).to.be.null;
                removeListContacts.push("list-contact.json");
                fs.writeFile(path.join(__dirname,"..","data","contacts","list-contact2.json"),JSON.stringify(contact2),(error)=>{
                    expect(error).to.be.null;
                    removeListContacts.push("list-contact2.json");
                    listContacts(userId,(error,contacts)=>{
                        expect(error).to.be.null;
                        expect(contacts.length).to.equal(2);
                        expect(contacts[0]).to.deep.equal(contact1);
                        expect(contacts[1]).to.deep.equal(contact2);
                        done();
                    })
                })
            })
        })
    })
    it("should throw an error when given the wrong type of parameters",()=>{
        expect(()=>{listContacts(undefined,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{listContacts(userId,undefined)}).to.throw(TypeError,undefined+" is not a function");
    })
    it("should receive an error when the user whose contacts is listing is not saved",done=>{
        listContacts(userId,(error,contacts)=>{
            expect(contacts).to.be.undefined;
            expect(error).to.exist;
            expect(error.message).to.equal(`user with id: ${userId} doesn't exist`);
            done();
        })
    })
    it("should return an empty array if there are no contacts saved by that user",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users","list-contact.json"),
        JSON.stringify({name:userName,surname:userSurname,email:userEmail,id:userId,password:userPassword}),
        (error)=>{
            expect(error).to.be.null;
            removeListUsers.push("list-contact.json")
            listContacts(userId,(error,contacts)=>{
                expect(error).to.be.null;
                expect(contacts).to.deep.equal([]);
                done();
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