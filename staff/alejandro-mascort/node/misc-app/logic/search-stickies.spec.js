const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const searchStickies = require('../logic/search-stickies')

describe('searchStickies', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id, stickie

    beforeEach(done =>{
        
        stickie = {
            tag: 'Go dinner',
            message: 'Diner at 8:00 a.m.'
        }

        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            deleteFilesByExtensionFromDirectory(path.join(data, 'stickies'), '.json', error => {
                if (error) return done(error)
           
                name = `name-${random()}`;
                surname = `surname${random()}`;
                email = `${random()}@mail.com`;
                password = `${random()}` ;
                id = uid()
    
                const newUser = {name,surname,email,password,id};
    
                fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
                    if (error) return done(error) 

                    const file = `${uid()}.json`
                    stickie.user = id;
                    
                    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(stickie), error => {
                        if (error) return callback(error)
                
                        done()
                    })
                })
            })

        })
        
    })

    describe('Sould sucess to search query',()=>{

        it('Sould sucess to search just one stickie',done=>{
            const query = stickie.tag

            searchStickies(id, query, (error,_stickie)=>{
                const [{tag:_tag,message:_message, user:_id}] = _stickie
                expect(error).to.be.null
                expect(_stickie).to.be.instanceof(Array)
                expect(_stickie.length).to.be.greaterThan(0)
                expect(_tag).to.equal(stickie.tag)
                expect(_message).to.equal(stickie.message)            
                expect(_id).to.equal(id)
                
                done()
            })
        })
  
        
        it('Sould sucess to search two or more stickie', done => {
            const __id = uid()

            const _stickie = {
                tag: 'Go dinner',
                message: 'Diner at 8:00 a.m.',
                user: id
            }
            
            fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', `${__id}.json`), JSON.prettify(_stickie), error => {
              
                expect(error).to.be.null

                const query = stickie.tag

                searchStickies(id, query, (error,_stickie)=>{
                    expect(error).to.be.null
                    expect(_stickie).to.be.instanceof(Array)
            
                    expect(_stickie.length).to.be.greaterThan(1)
                    let count = 0;
                    
                    _stickie.forEach(({tag:_tag,message:_message,user:_id})=>{
                        
                        expect(_tag).to.exist
                        expect(_message).to.exist         
                        expect(_id).to.equal(id)

                        if(++count === _stickie.length) done()
                    })
                })
            })
        })
    })

    it('Sould fail wend don`t exist userId',done =>{
        const query = stickie.tag
        const __id = uid()
        searchStickies(__id, query,(error, stickies) => {            
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.equal(`user with ${__id} does not exist`)
            expect(stickies).to.be.undefined

            done()
        
        })
    })

    it('Sould fail on a un invalid query',done=>{
        const query = `${name}-name`

        searchStickies(id, query, (error,stickies)=>{
            
            expect(error).to.be.null
            expect(stickies).to.be.instanceof(Array)
            expect(stickies.length).to.be.equal(0)
            
            done()
        })
    })
 
    it('Sould fail with empty id',()=>{   
        const emptyId = '';
        const query = stickie.tag
    
        expect(() => searchStickies(emptyId, query, (error,stickies)=>{})).to.throw(Error, 'is empty or blank')
    })

    it('Sould fail with empty query',()=>{   
        const emptyQuery = '';
    
        expect(() => searchStickies(id, emptyQuery, (error,stickies)=>{})).to.throw(Error, 'is empty or blank')

    })

    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
             
            deleteFilesByExtensionFromDirectory(path.join(data, 'stickies'), '.json', error => {
                if (error) return done(error)
                    done()
            })
        })
    })    

})

    
