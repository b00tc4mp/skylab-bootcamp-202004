const findUserByFilters=require("./find-user-by-filter")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("findUserByFilter",()=>{
    let name,surname,email,password, removeList;
    beforeEach(()=>{
        name=`name-${random()}`;
        surname=`surname-${random()}`;
        email=`${name}@${surname}.com`;
        password=`${random()}`;
        removeList=[];
    })
    it("should return the users that pass the specified criteria",done=>{
        const user1={name,surname,email,password};
        const user2={name:surname,surname:name,email:`${surname}@${name}.com`,password};
        fs.writeFile(path.join(__dirname,"..","data","users",`find-user-test1.json`),JSON.stringify(user1),error=>{
            expect(error).to.be.null;
            removeList.push(`find-user-test1.json`);
            fs.writeFile(path.join(__dirname,"..","data","users","find-user-test2.json"),JSON.stringify(user2),error=>{
                expect(error).to.be.null;
                removeList.push(`find-user-test2.json`)
                findUserByFilters({email},(error,results)=>{
                    expect(error).to.be.null;
                    expect(results.length).to.equal(1);
                    expect(user1.name).to.equal(results[0].name);
                    expect(user1.surname).to.equal(results[0].surname);
                    expect(user1.email).to.equal(results[0].email);
                    expect(user1.password).to.equal(results[0].password);
                    expect(results[1]).to.be.undefined;
                    done();
                })
            })
        })
    })
    it("should work with multiple filters at the same time",done=>{
        const user1={name,surname,email,password};
        const user2={name:surname,surname:name,email:`${surname}@${name}.com`,password};
        fs.writeFile(path.join(__dirname,"..","data","users",`find-user-test1.json`),JSON.stringify(user1),error=>{
            expect(error).to.be.null;
            removeList.push(`find-user-test1.json`);
            fs.writeFile(path.join(__dirname,"..","data","users","find-user-test2.json"),JSON.stringify(user2),error=>{
                expect(error).to.be.null;
                removeList.push(`find-user-test2.json`)
                findUserByFilters({email,name},(error,results)=>{
                    expect(error).to.be.null;
                    expect(results.length).to.equal(1);
                    expect(user1.name).to.equal(results[0].name);
                    expect(user1.surname).to.equal(results[0].surname);
                    expect(user1.email).to.equal(results[0].email);
                    expect(user1.password).to.equal(results[0].password);
                    expect(results[1]).to.be.undefined;
                    done();
                })
            })
        })
    })
    it("should throw an error when not given a filter or a callback",()=>{
        expect(()=>{findUserByFilters("filter",()=>{})}).to.throw(TypeError,"filter is not an object");
        expect(()=>{findUserByFilters({name},"notafunction")}).to.throw(TypeError,"notafunction is not a function");
    })
    it("should return an empty array if no file match the criteria",done=>{
        findUserByFilters({name},(error,results)=>{
            expect(error).to.be.null;
            expect(results).to.deep.equal([])
            done()
        })
    })
    afterEach((done)=>{
        for(let i=0;i<removeList.length;i++){
            fs.unlink(path.join(__dirname,"..","data","users",removeList[i]),()=>{})
        }
        done()
    })
})