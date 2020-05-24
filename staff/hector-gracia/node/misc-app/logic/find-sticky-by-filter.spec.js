const findSticky=require("./find-sticky-by-filter")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')

describe("findStickyByFilter",()=>{
    let removeList;
    let title,description,id;
    let sticky,sticky2;
    beforeEach(()=>{
        title=`title-${random()}`;
        description=`description-${random()}`;
        id=`${Date.now()}-${random()}`;
        removeList=[];
        sticky={title,description,date:Date.now().toString(),id};
        sticky2={title:description,description:title,date:Date.now().toString(),id:id+2};
    })
    it("should return the stickies that pass the specified criteria",done=>{
        fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky.id}.json`),JSON.stringify(sticky),error=>{
            expect(error).to.be.null;
            removeList.push(`${sticky.id}.json`);
            fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky2.id}2.json`),
            JSON.stringify(sticky2),error=>{
                expect(error).to.be.null;
                removeList.push(`${sticky2.id}2.json`)
                findSticky({date:sticky2.date},(error,results)=>{
                    expect(error).to.be.null;
                    expect(results.length).to.equal(2);
                    expect(results[0].title).to.equal(sticky.title);
                    expect(results[0].description).to.equal(sticky.description);
                    expect(results[0].date).to.equal(sticky.date);
                    expect(results[0].id).to.equal(sticky.id);
                    expect(results[1].title).to.equal(sticky2.title);
                    expect(results[1].description).to.equal(sticky2.description);
                    expect(results[1].date).to.equal(sticky2.date);
                    expect(results[1].id).to.equal(sticky2.id);
                    done();
                })
            })
        })
    })
    it("should work with multiple filters at the same time",done=>{
        fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky.id}.json`),JSON.stringify(sticky),error=>{
            expect(error).to.be.null;
            removeList.push(`${sticky.id}.json`);
            fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky2.id}.json`),JSON.stringify(sticky2),error=>{
                expect(error).to.be.null;
                removeList.push(`${sticky2.id}.json`)
                findSticky({title,description},(error,results)=>{
                    expect(error).to.be.null;
                    expect(results.length).to.equal(1);
                    expect(results[1]).to.be.undefined;
                    expect(results[0].title).to.equal(sticky.title);
                    expect(results[0].description).to.equal(sticky.description);
                    expect(results[0].date).to.equal(sticky.date);
                    expect(results[0].id).to.equal(sticky.id);
                    done();
                })
            })
        })
    })
    it("should throw an error when not given a filter or a callback",()=>{
        expect(()=>{findSticky("filter",()=>{})}).to.throw(TypeError,"filter is not an object");
        expect(()=>{findSticky({title},"notafunction")}).to.throw(TypeError,"notafunction is not a function");
    })
    it("should return an empty array if no file match the criteria",done=>{
        findSticky({title},(error,results)=>{
            expect(error).to.be.null;
            expect(results).to.deep.equal([])
            done()
        })
    })
    afterEach((done)=>{
        for(let i=0;i<removeList.length;i++){
            fs.unlink(path.join(__dirname,"..","data","stickies",removeList[i]),()=>{})
        }
        done()
    })
})