const authenticateUser=require("./authenticate-user")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("authenticateUser",()=>{
    let name,surname,email,password,id,removeList;

    beforeEach(()=>{
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`${name}@${surname}.com`
        password=`${random()}`
        id=`${random()}`
        removeList=[]
    })
    it("should return the id of an authenticated user", done=>{
        fs.writeFile(path.join(__dirname,"..","data","users","authenticate-test.json"),JSON.stringify({name,surname,email,password,id}),error=>{
            expect(error).to.be.null;
            removeList.push("authenticate-test.json");
            authenticateUser(email,password,(error,_id)=>{
                expect(error).to.be.null;
                expect(_id).to.equal(id);
                done();
            })

        })
    })
    it("should throw an error when given invalid parameters",()=>{
        expect(()=>{authenticateUser(undefined,password,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{authenticateUser(email,undefined,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{authenticateUser(email,password,undefined)}).to.throw(TypeError,undefined+" is not a function");
    })
    it("should receive an error if there is no user registered with that email",done=>{
        authenticateUser(email,password,(error,_id)=>{
            expect(_id).to.be.undefined;
            expect(error.message).to.equal(`user with email: ${email} doesn't exist`);
            done();
        })
    })
    it("should receive an error if the email and the password doesn't match",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users","authenticate-test2.json"),JSON.stringify({name,surname,email,password,id}),error=>{
            expect(error).to.be.null;
            removeList.push("authenticate-test2.json");
            authenticateUser(email,password+name,(error,_id)=>{
                expect(_id).to.be.undefined;
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