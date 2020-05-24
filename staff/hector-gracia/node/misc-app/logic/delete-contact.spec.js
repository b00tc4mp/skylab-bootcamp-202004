const deleteContact=require("./delete-contact")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("deleteContact",()=>{
    let contact={};
    beforeEach(()=>{
        contact.name=`name-${random()}`;
        contact.surname=`surname-${random()}`;
        contact.email=`${contact.name}@${contact.surname}.com`;
        contact.phone=`${random()}`;
        contact.birthdate=Date.now().toString();
        contact.id=`${Date.now()}-${random()}`;
        contact.country=`country-${random()}`;
    })
    it("should remove a specified contact from the data/contacts directory",done=>{
        fs.writeFile(path.join(__dirname,"..","data","contacts",`${contact.id}.json`),JSON.stringify(contact),(error)=>{
            expect(error).to.be.null;
            deleteContact(contact.id,(error,status)=>{
                expect(error).to.be.null;
                expect(status.message).to.equal("OK");
                fs.readFile(path.join(__dirname,"..","data","contacts",`${contact.id}.json`),(error)=>{
                    expect(error.message).to.equal(`ENOENT: no such file or directory, open '${path.join(__dirname,"..","data","contacts",`${contact.id}.json`)}'`)
                    done()
                })
            })
        })
    })
    it("should receive an error if the contact doen't exist",done=>{
        deleteContact(contact.id,(error,status)=>{
            expect(status).to.be.undefined;
            expect(error).to.exist;
            expect(error.message).to.equal(`contact with id: ${contact.id} doesn't exist`)
            done();
        })
    })
    it("should throw an error if called with the wrong type of parameters",()=>{
        expect(()=>{deleteContact(undefined,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{deleteContact(contact.id,undefined)}).to.throw(TypeError,undefined+" is not a function");
    })
})