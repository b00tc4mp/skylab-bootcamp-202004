
const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const listStickies = require('../logic/list-stickies')

describe('listStickies', () => {
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

    it('Sould sucess to list a stickies',done =>{
        listStickies(id,(error,stickies)=>{
            const [{tag:_tag ,message:_message,user:_id}] = stickies
            expect(error).to.be.null

            expect(stickies).to.be.instanceof(Array)
            expect(stickies.length).to.be.greaterThan(0)
            expect(_tag).to.equal(stickie.tag)
            expect(_message).to.equal(stickie.message)            
            expect(_id).to.equal(stickie.user)
            
            done()
        })
    })

    it('Sould fail wend don`t exist userId',done =>{

        const __id = uid()
        listStickies(__id,(error, stickies) => {            
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.equal(`user with ${__id} does not exist`)
            expect(stickies).to.be.undefined

            done()
        
        })
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

    
