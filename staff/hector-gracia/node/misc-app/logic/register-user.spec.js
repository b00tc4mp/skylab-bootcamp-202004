const registerUser=require("./register-user")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("registerUser",()=>{
    let name,surname,email,password,removeList;

    beforeEach(()=>{
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`${name}@${surname}.com`
        password=`${random()}`
        removeList=[]
    })
    it("should succeed registering a new user",(done)=>{
        registerUser({name,surname,email,password},(error,id)=>{
            expect(error).to.be.null
            expect(id).to.be.a("string")
            removeList.push(`${id}.json`)

            fs.readFile(path.join(__dirname,"..","data","users",`${id}.json`),"utf8",(error,data)=>{
                expect(error).to.be.null
                expect(data).to.exist
                const user = JSON.parse(data)
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.surname).to.equal(surname)
                expect(user.password).to.equal(password)
                done()
            })
        })
    })
    it("should throw an error when given invalid parameters",()=>{
        expect(()=>{registerUser({name:undefined,surname,email,password},()=>{})}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{registerUser({name,surname:undefined,email,password},()=>{})}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{registerUser({name,surname,email:undefined,password},()=>{})}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{registerUser({name,surname,email,password:undefined},()=>{})}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{registerUser({name,surname,email,password},undefined)}).to.throw(TypeError,"undefined is not a function")
    })
    it("should return an error on the callback when user is already registered",(done)=>{
        fs.writeFile(path.join(__dirname,"..","data","users","register-test.json"),JSON.stringify({name,surname,email,password}),error=>{
           expect(error).to.be.null
           removeList.push("register-test.json")
           registerUser({name,surname,email,password},(error,id)=>{
               expect(error.message).to.equal(`user with email: ${email} already registered`)
               expect(id).to.be.undefined
               done()
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