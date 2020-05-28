const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const { random } = Math
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const uid = require('../utils/uid')
const { removeSticky } = require('./')
require('../utils/json')

describe.only('removeSticky', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, userId, sticky

   


    beforeEach(done => {
        
   

        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), 'json', error => {
            if (error) return done(error)
            deleteFilesByExtensionFromDirectory(path.join(data, 'stickies'), 'json', error => {
                if (error) return done(error)

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()

                sticky = {
                    message: 'Dinner at 9:00 am',
                    idSticky: uid()
                }
                const user = { name, surname, email, password, id: userId }

                fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                    if (error) return done(error)

                    sticky.userId = userId
                   
                    fs.writeFile(path.join(data, 'stickies', `${sticky.idSticky}.json`), JSON.prettify(sticky), error => {
                        if (error) return done(error)

                        done()
                    })
                })
            })
        })
    })

    it('should succedd on remove sticky', done =>{
        removeSticky(userId,sticky.idSticky,(error,body)=>{
            if (error) return done(error)
            expect(error).to.be.null
            expect(body).to.exist
            expect(body).to.be.equal('succes');
         
            fs.readFile(path.join(__dirname,'..','data','stickies',`${sticky.idSticky}.json`), 'utf-8',(error,body)=>{
                expect(error).to.exist
                expect(body).to.be.undefined
        
                done()
            })
        })
    })

    it('should succedd on remove sticky', done =>{
        const _userId = uid()

        removeSticky(_userId,sticky.idSticky,(error,body)=>{
            expect(error).to.exist
            expect(error).to.instanceof(Error)
            expect(error.message).to.equal('something wrong happen')
            expect(body).to.be.undefined
            
           done()
        })
    })

    it('should succedd on remove sticky', done =>{
        idSticky

        removeSticky(userId,_sticky.idSticky,(error,body)=>{
            expect(error).to.exist
            expect(error).to.instanceof(Error)
            expect(error.message).to.equal('something wrong happen')
            expect(body).to.be.undefined
            
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