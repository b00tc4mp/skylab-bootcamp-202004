const addSticky=require("./add-sticky")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("addSticky",()=>{
    let removeListUsers,removeListStickies;
    let title,description,id;
    let sticky,user;
    beforeEach(()=>{
        title=`title-${random()}`;
        description=`description-${random()}`;
        removeListUsers=[];
        removeListStickies=[];
        sticky={title,description};
        user={};
        user.name=`name-${random()}`
        user.surname=`surname-${random()}`
        user.email=`${user.name}@${user.surname}.com`
        user.password=`${random()}`
        user.id=`${Date.now()}-${random()}`
    })
    it("should add a stickiy to the data/stickies directory",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${user.id}.json`),JSON.stringify(user),(error)=>{
            expect(error).to.be.null;
            removeListUsers.push(`${user.id}.json`);
            addSticky(user.id,sticky,(error,stickyId)=>{
                expect(error).to.be.null;
                expect(stickyId).to.be.a("string");
                removeListStickies.push(`${stickyId}.json`);
                fs.readFile(path.join(__dirname,"..","data","stickies",`${stickyId}.json`),(error,data)=>{
                    expect(error).to.be.null;
                    const _sticky=JSON.parse(data);
                    expect(sticky.title).to.equal(_sticky.title);
                    expect(sticky.description).to.equal(_sticky.description);
                    expect(sticky.id).to.equal(stickyId);
                    expect(sticky.userId).to.equal(user.id);
                    done();
                });
            })
        })
    })
    it("should receive an error if the user is trying to link it to doesn't exist",done=>{
        addSticky(user.id,sticky,(error,stickyId)=>{
            expect(stickyId).to.be.undefined;
            expect(error).to.exist;
            expect(error.message).to.equal(`user with id: ${user.id} doesn't exist`);
            done();
        })
    })
    it("should be capable of adding a sticky without giving it a description",done=>{
        fs.writeFile(path.join(__dirname,"..","data","users",`${user.id}.json`),JSON.stringify(user),(error)=>{
            expect(error).to.be.null;
            removeListUsers.push(`${user.id}.json`);
            addSticky(user.id,{title},(error,stickyId)=>{
                expect(error).to.be.null;
                expect(stickyId).to.be.a("string");
                removeListStickies.push(`${stickyId}.json`);
                fs.readFile(path.join(__dirname,"..","data","stickies",`${stickyId}.json`),(error,data)=>{
                    expect(error).to.be.null;
                    const _sticky=JSON.parse(data);
                    expect(_sticky.title).to.equal(title);
                    expect(_sticky.description).to.be.undefined;
                    expect(_sticky.id).to.equal(stickyId);
                    expect(_sticky.userId).to.equal(user.id);
                    done();
                });
            })
        })
    })
    it("should throw an error when called with the wrong type of parameters",()=>{
        expect(()=>{addSticky(undefined,sticky,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{addSticky(user.id,undefined,()=>{})}).to.throw(TypeError,undefined+" is not an object");
        expect(()=>{addSticky(user.id,{title:undefined,description},()=>{})}).to.throw(Error,"missing sticky title");
        expect(()=>{addSticky(user.id,{title:123,description},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addSticky(user.id,{title,description:123},()=>{})}).to.throw(TypeError,123+" is not a string");
        expect(()=>{addSticky(user.id,sticky,undefined)}).to.throw(TypeError,undefined+" is not a function");
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