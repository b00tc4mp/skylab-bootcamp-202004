const retrieveContact=require("./retrieve-contact")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("retrieveContact",()=>{
    let contact={};
    let removeListContacts=[];
    beforeEach(()=>{
        contact.name=`name-${random()}`;
        contact.surname=`surname-${random()}`;
        contact.email=`${contact.name}@${contact.surname}.com`;
        contact.phone=`${random()}`;
        contact.birthdate=Date.now().toString();
        contact.id=`${Date.now()}-${random()}`;
        contact.country=`country-${random()}`;
        removeListContacts=[];
    })
    it("should receive a contact when given its id",done=>{
        fs.writeFile(path.join(__dirname,"..","data","contacts",`${contact.id}.json`),JSON.stringify(contact),(error)=>{
            expect(error).to.be.null;
            removeListContacts.push(`${contact.id}.json`);
            retrieveContact(contact.id,(error,_contact)=>{
                expect(error).to.be.null;
                expect(contact.name).to.equal(_contact.name);
                expect(contact.surname).to.equal(_contact.surname);
                expect(contact.email).to.equal(_contact.email);
                expect(contact.phone).to.equal(_contact.phone);
                expect(contact.id).to.equal(_contact.id);
                expect(contact.country).to.equal(_contact.country);
                expect(contact.birthdate).to.equal(_contact.birthdate);
                done()
            })
        })
    })
    it("should receive an error when given an id that doen't exist",done=>{
        retrieveContact(contact.id,(error,_contact)=>{
            expect(_contact).to.be.undefined;
            expect(error.message).to.equal(`contact with id: ${contact.id} doesn't exist`);
            done()
        })
    })
    it("should throw an error when called with the wrong type of parameters",()=>{
        expect(()=>{retrieveContact(undefined,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{retrieveContact(contact.id,undefined)}).to.throw(TypeError,undefined+" is not a function");
    })
    afterEach(done=>{
        for(let i=0;i<removeListContacts.length;i++){
            fs.unlink(path.join(__dirname,"..","data","contacts",removeListContacts[i]),()=>{})
        }
        done()
    })
})