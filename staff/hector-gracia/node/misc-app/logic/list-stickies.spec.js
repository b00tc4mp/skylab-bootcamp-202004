const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const listStickies=require("./list-stickies");

describe("listStickies",()=>{
    let removeListStickies,removeListUsers;
    let user,sticky,sticky2;
    beforeEach(()=>{
        user={};
        sticky={};
        sticky2={};
        user.name=`name-${random()}`;
        user.surname=`surname-${random()}`;
        user.email=`${user.name}@${user.surname}.com`;
        user.password=`${random()}`;
        user.id=`${Date.now()}-${random()}`;
        sticky.title=`title-${random()}`;
        sticky.description=`description-${random()}`;
        sticky.id=`${Date.now()}-${random()}`;
        sticky.userId=user.id;
        sticky2.title=`title-${random()}`;
        sticky2.description=`description-${random()}`;
        sticky2.id=`${Date.now()}-${random()}`;
        sticky2.userId=user.id;
        removeListStickies=[];
        removeListUsers=[];
    })
    it("should receive all the stickies that a user has saved",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${user.id}.json`),
        JSON.stringify(user),
        (error)=>{
            expect(error).to.be.null;
            removeListUsers.push(`${user.id}.json`);
            fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky.id}.json`),JSON.stringify(sticky),(error)=>{
                expect(error).to.be.null;
                removeListStickies.push(`${sticky.id}.json`);
                fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky2.id}.json`),JSON.stringify(sticky2),(error)=>{
                    expect(error).to.be.null;
                    removeListStickies.push(`${sticky2.id}.json`);
                    listStickies(user.id,(error,stickies)=>{
                        expect(error).to.be.null;
                        expect(stickies.length).to.equal(2);
                        expect(stickies[0]).to.deep.equal(sticky);
                        expect(stickies[1]).to.deep.equal(sticky2);
                        done();
                    })
                })
            })
        })
    })
    it("should throw an error when given the wrong type of parameters",()=>{
        expect(()=>{listStickies(undefined,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{listStickies(user.id,undefined)}).to.throw(TypeError,undefined+" is not a function");
    })
    it("should receive an error when the user whose stickies is listing is not saved",done=>{
        listStickies(user.id,(error,stickies)=>{
            expect(stickies).to.be.undefined;
            expect(error).to.exist;
            expect(error.message).to.equal(`user with id: ${user.id} doesn't exist`);
            done();
        })
    })
    it("should return an empty array if there are no stickies saved by that user",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${user.id}.json`),
        JSON.stringify(user),
        (error)=>{
            expect(error).to.be.null;
            removeListUsers.push(`${user.id}.json`)
            listStickies(user.id,(error,stickies)=>{
                expect(error).to.be.null;
                expect(stickies).to.deep.equal([]);
                done();
            })
        })
    })
    afterEach(done=>{
        for(let i=0;i<removeListUsers.length;i++){
            fs.unlink(path.join(__dirname,"..","data","users",removeListUsers[i]),()=>{})
        }
        for(let i=0;i<removeListStickies.length;i++){
            fs.unlink(path.join(__dirname,"..","data","stickies",removeListStickies[i]),()=>{})
        }
        done()
    })
})