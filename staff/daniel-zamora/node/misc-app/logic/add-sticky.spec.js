const addSticky = require('./add-sticky')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
var assert = require('assert');

describe('addSticky', () => {
    let name, tag, comment, id
    
    beforeEach(() => {
        name = `name-${random()}`
        tag = `${random()} random tag`
        comment = `${random()} random comment`
        id = uid()
    })

    it('should succeed on valid data', done => {
        addSticky({ name, tag, comment, id }, (error, id) => { 
            expect(error).to.be.null
    
            expect(id).to.be.a('string')
            
            fs.readFile(path.join(__dirname, '..', 'data', 'stickies', `sticky-${id}.json`), 'utf8', (error, content) => {

                expect(error).to.be.null
    
                expect(content).to.exist
    
                const sticky = JSON.parse(content)
    
                expect(sticky.name).to.equal(name)
                expect(sticky.tag).to.equal(tag)
                expect(sticky.comment).to.equal(comment)
                done()
            })
        })
    })

    it('should fail when inputs do not meet the criteria', () => {
        expect(function(){
            addSticky({ name: 1, comment, tag, id }, (error, id) => { 
                if(error) throw error
            })
        }).to.throw(TypeError)

        expect(function(){
            addSticky({ name, comment: 1, tag, id }, (error, id) => { 
                if(error) throw error
            })
        }).to.throw(TypeError)

        expect(function(){
            addSticky({ name, comment, tag: 1, id }, (error, id) => { 
                if(error) throw error
            })
        }).to.throw(TypeError)

        expect(function(){
            addSticky({ name, comment, tag, id: 1 }, (error, id) => { 
                if(error) throw error
            })
        }).to.throw(TypeError)

        expect(function(){
            addSticky({ name, comment, tag, id}, 1)
        }).to.throw(TypeError)

        expect(function(){
            addSticky(1, (error, id) => { 
                if(error) throw error
            })
        }).to.throw(TypeError)
    })

    afterEach(()=>{
        fs.readdir(path.join(__dirname, '..', 'data', 'stickies'), (error, files) => {
            if (error) throw error
    
            files.forEach(file => {
                if (file === `sticky-${id}.json`){
                    fs.unlink(path.join(__dirname, '..', 'data', 'stickies', file),error=>{
                        if (error) throw error
                        
                    })
                }
            })
        })
    })
})