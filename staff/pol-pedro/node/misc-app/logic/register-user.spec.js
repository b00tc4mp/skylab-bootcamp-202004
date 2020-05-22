const assert=require("assert")
const registerUser=require("./register-user")
const { random } = Math
const fs = require('fs')
const path = require('path')

const name=`name-${random()}`
const surname=`surname-${random()}`
const email=`${name}@${surname}.com`
const password=`${random()}`

registerUser({name,surname,email,password},(error,id)=>{

    assert(!error)
    assert(typeof id==="string")

    fs.readFile(path.join(__dirname,"..","data","users",`${id}.json`),"utf8",(error,data)=>{
        assert(!error)
        assert(content)
        const userData= JSON.parse(data)
        assert.equal(userData.name,name)
        assert.equal(userData.surname,surname)
        assert.equal(userData.email,email)
        assert.equal(userData.password,password)

        fs.unlink(path.join(__dirname,"..","data","users",`${id}.json`),()=>{
            fs.access(path.join(__dirname,"..","data","users",`${id}.json`),fs.F_OK,(error)=>{
                assert(error)
            })
        })
    })
})