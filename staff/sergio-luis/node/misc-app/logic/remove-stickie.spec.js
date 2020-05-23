const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const removeStickie = require('../logic/remove-stickie')

describe('removeStickie', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id,stickie

    beforeEach(done =>{
        stickie = {
            tag: 'Dinner',
            message: 'Dinner at 8 o´clock',
            stickieId: uid()
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

                    const file = `${stickie.stickieId}.json`

                    stickie.user = id;
        
                    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(stickie), error => {
                        if (error) return callback(error)
                
                        done()
                    })
                })
            })

        })
        
    })


    it('Sould sucess to remove a stickie',done=>{

        removeStickie(id, stickie, (error, message) => {
            expect(error).to.be.null
            expect(message).to.exist
            expect(message).to.equal(`Deleted "${stickie.tag}" tag!`)

            done()
        })
    })

    it('Sould fail wend id don`t exist',done=>{
        const _id = `${id}-id`

        removeStickie(_id, stickie, (error, message) => {
            expect(message).to.be.undefined
            expect(error).to.exist
            expect(error).to.instanceof(Error)
            expect(error.message).to.equal(`user with id: ${_id}, does not exist`)
            
            done()
        })
    })

    it('Sould fail wend stickieId don`t exist',done=>{
        let _stickie = stickie
        _stickie.stickieId = uid()
       
        removeStickie(id, _stickie, (error, message) => {
            expect(message).to.be.undefined
            expect(error).to.exist
            expect(error).to.instanceof(Error)
            expect(error.message).to.equal(`this ${_stickie.stickieId} does not exist`)
    
            done()
        })
    })
    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })    

})
