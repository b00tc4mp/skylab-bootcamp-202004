const retrieveUser=require("./retrieve-user")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("retrieveUser",()=>{
    let name,surname,email,password,id,removeList;
    beforeEach(()=>{
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`${name}@${surname}.com`
        password=`${random()}`
        id=`${random()}`
        removeList=[]
    })
    it("should return the public information of a user",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users","retrieve-test.json"),JSON.stringify({name,surname,email,password,id}),error=>{
            expect(error).to.be.null;
            removeList.push("retrieve-test.json");
            retrieveUser(id,(error,_user)=>{
                expect(error).to.be.null;
                expect(_user.name).to.equal(name);
                expect(_user.surname).to.equal(surname);
                expect(_user.email).to.equal(email);
                expect(_user.id).to.be.undefined;
                expect(_user.password).to.be.undefined;
                done()
            })
        })
    })
    it("should throw an error when given invalid parameters",()=>{
        expect(()=>{retrieveUser(undefined,()=>{})}).to.throw(undefined+" is not a string");
        expect(()=>{retrieveUser(id,undefined)}).to.throw(undefined+" is not a function");
    })
    it("should receive an error if there is no user registered with that id",done=>{
        retrieveUser(id,(error,_user)=>{
            expect(_user).to.be.undefined;
            expect(error.message).to.equal(`user with id: ${id} doesn't exist`);
            done();
        })
    })
    afterEach((done)=>{
        for(let i=0;i<removeList.length;i++){
            fs.unlink(path.join(__dirname,"..","data","users",removeList[i]),()=>{})
        }
        done()
    })
})