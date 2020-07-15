const unregisterUser=require("./unregister-user")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const findUser=require("../logic/find-user-by-filter")


describe("unregisterUser",()=>{
    let name,surname,email,password,id,removeList;
    beforeEach(()=>{
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`${name}@${surname}.com`
        password=`${random()}`
        id=`${random()}`
        removeList=[]
    })
    it("should remove a user from the server",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${id}.json`),JSON.stringify({name,surname,email,password,id}),error=>{
            expect(error).to.be.null;
            removeList.push(`${id}.json`);
            unregisterUser(email,password,(error,status)=>{
                expect(error).to.be.null;
                expect(status.message).to.equal("OK");
                findUser({email},(error,users)=>{
                    expect(error).to.be.null;
                    expect(users).to.deep.equal([]);
                    done();
                })
            })
        })
    })
    it("should throw an error when given invalid parameters",()=>{
        expect(()=>{unregisterUser(undefined,password,()=>{})}).to.throw(undefined+" is not a string");
        expect(()=>{unregisterUser(email,undefined,()=>{})}).to.throw(undefined+" is not a string");
        expect(()=>{unregisterUser(email,password,undefined)}).to.throw(undefined+" is not a function");
    })
    it("should receive an error if there is no user registered with that email",done=>{
        unregisterUser(email,password,(error,status)=>{
            expect(status).to.be.undefined;
            expect(error.message).to.equal(`user with email: ${email} doesn't exist`);
            done()
        })
    })
    it("should receive an error if the email and password doen't match",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${id}.json`),JSON.stringify({name,surname,email,password,id}),error=>{
            expect(error).to.be.null;
            removeList.push(`${id}.json`);
            unregisterUser(email,password+name,(error,status)=>{
                expect(status).to.be.undefined;
                expect(error.message).to.equal("wrong password");
                done();
            })
        })
    })
    afterEach((done)=>{
        for(let i=0;i<removeList.length;i++){
            fs.unlink(path.join(__dirname,"..","data","users",removeList[i]),()=>{})
        }
        done()
    })
})