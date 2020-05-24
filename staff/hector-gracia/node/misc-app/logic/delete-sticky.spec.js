const deleteSticky=require("./delete-sticky")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("deleteSticky",()=>{
    let sticky={};
    beforeEach(()=>{
        sticky.title=`title-${random()}`;
        sticky.description=`description-${random()}`;
        sticky.id=`${Date.now()}-${random()}`
    })
    it("should remove a sticky from the data/stickies directory",done=>{
        fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky.id}.json`),JSON.stringify(sticky),(error)=>{
            expect(error).to.be.null;
            deleteSticky(sticky.id,(error,status)=>{
                expect(error).to.be.null;
                expect(status.message).to.equal("OK");
                done();
            })
        })
    })
    it("should receive an error when trying to delete a sticky that doesn't exist",done=>{
        deleteSticky(sticky.id,(error,status)=>{
            expect(status).to.be.undefined;
            expect(error).to.exist;
            expect(error.message).to.equal(`sticky with id: ${sticky.id} doesn't exist`);
            done();
        })
    })
    it("should throw an error when called with incorrect parameters",()=>{
        expect(()=>{deleteSticky(undefined,()=>{})}).to.throw(TypeError,undefined+" is not a string");
        expect(()=>{deleteSticky(sticky.id,undefined)}).to.throw(TypeError,undefined+" is not a funciton")
    })
})