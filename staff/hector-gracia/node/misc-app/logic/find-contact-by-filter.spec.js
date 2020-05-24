const findContact=require("./find-contact-by-filter")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("findContactByFilter",()=>{
    let name,surname,email,phone,birth,id,country, removeList;
    beforeEach(()=>{
        name=`name-${random()}`;
        surname=`surname-${random()}`;
        email=`${name}@${surname}.com`;
        phone=`${random()}`;
        birth=Date.now().toString();
        id=`${Date.now()}-${random()}`
        country=`country-${random()}`;
        removeList=[];
    })
    it("should return the contacts that pass the specified criteria",done=>{
        fs.writeFile(path.join(__dirname,"..","data","contacts",`${id}.json`),JSON.stringify({name,surname,email,phone,birth,country,id}),error=>{
            expect(error).to.be.null;
            removeList.push(`${id}.json`)
            fs.writeFile(path.join(__dirname,"..","data","contacts",`${id}2.json`),JSON.stringify({name:surname,surname:name,email,phone:phone+5,birth,country,id:id+2}),error=>{
                expect(error).to.be.null;
                removeList.push(`${id}2.json`)
                findContact({name},(error,contacts)=>{
                    expect(error).to.be.null;
                    expect(contacts.length).to.equal(1);
                    expect(contacts[0].name).to.equal(name);
                    expect(contacts[0].surname).to.equal(surname);
                    expect(contacts[0].email).to.equal(email);
                    expect(contacts[0].phone).to.equal(phone);
                    expect(contacts[0].birth).to.equal(birth);
                    expect(contacts[0].id).to.equal(id);
                    expect(contacts[0].country).to.equal(country);
                    findContact({country},(error,contacts)=>{
                        expect(error).to.be.null;
                        expect(contacts.length).to.equal(2);
                        expect(contacts[0].name).to.equal(name);
                        expect(contacts[0].surname).to.equal(surname);
                        expect(contacts[0].email).to.equal(email);
                        expect(contacts[0].phone).to.equal(phone);
                        expect(contacts[0].birth).to.equal(birth);
                        expect(contacts[0].id).to.equal(id);
                        expect(contacts[0].country).to.equal(country);
                        expect(contacts[1].name).to.equal(surname);
                        expect(contacts[1].surname).to.equal(name);
                        expect(contacts[1].email).to.equal(email);
                        expect(contacts[1].phone).to.equal(phone+5);
                        expect(contacts[1].birth).to.equal(birth);
                        expect(contacts[1].id).to.equal(id+2);
                        expect(contacts[1].country).to.equal(country);
                        done();
                    })
                })
            })
        })
    })
    it("should work with multiple filters at the same time",done=>{
        fs.writeFile(path.join(__dirname,"..","data","contacts",`${id}.json`),JSON.stringify({name,surname,email,phone,birth,country,id}),error=>{
            expect(error).to.be.null;
            removeList.push(`${id}.json`)
            fs.writeFile(path.join(__dirname,"..","data","contacts",`${id}2.json`),JSON.stringify({name:surname,surname:name,email,phone:phone+5,birth,country,id:id+2}),error=>{
                expect(error).to.be.null;
                removeList.push(`${id}2.json`)
                findContact({name,surname},(error,contacts)=>{
                    expect(error).to.be.null;
                    expect(contacts.length).to.equal(1);
                    expect(contacts[0].name).to.equal(name);
                    expect(contacts[0].surname).to.equal(surname);
                    expect(contacts[0].email).to.equal(email);
                    expect(contacts[0].phone).to.equal(phone);
                    expect(contacts[0].birth).to.equal(birth);
                    expect(contacts[0].id).to.equal(id);
                    expect(contacts[0].country).to.equal(country);
                    done();
                })
            })
        })
    })
    it("should throw an error when not given a filter or a callback",()=>{
        expect(()=>{findContact("filter",()=>{})}).to.throw(TypeError,"filter is not an object");
        expect(()=>{findContact({name},"notafunction")}).to.throw(TypeError,"notafunction is not a function");
    })
    it("should return an empty array if no contact match the criteria",done=>{
        findContact({name},(error,contacts)=>{
            expect(error).to.be.null;
            expect(contacts).to.deep.equal([]);
            done();
        }) 
    })
    afterEach((done)=>{
        for(let i=0;i<removeList.length;i++){
            fs.unlink(path.join(__dirname,"..","data","contacts",removeList[i]),()=>{})
        }
        done()
    })
})