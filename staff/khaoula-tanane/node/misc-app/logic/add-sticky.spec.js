const fs = require('fs')
const uid = require('../utils/uid')
const path = require('path')
const { expect } = require('chai')
const { random } = Math
const addStickie = require('../logic/add-stickie')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')

describe('addStickie', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            deleteFilesByExtensionFromDirectory(path.join(data, 'stickies'), '.json', error => {
                if (error) return done(error)
              
                name = `name-${random()}`;
                surname = `surname${random()}`;
                email = `${random()}@email.com`;
                password = `${random()}` ;
                id = uid()
    
                const newUser = {name,surname,email,password,id};
    
                fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
                    if (error) return done(error) 
                    done()
                })
            })

        })
        
    })
 
    it('Should succeed on adding a stickie',done=>{
        const stickie = {
            tag: 'Salute',
            message: 'Hello Kaula'
        }

        addStickie(id, stickie,(error, _id) => {
            expect(error).to.be.null
            expect(_id).to.exist

            fs.readFile(path.join(__dirname,'..','data','stickies',`${_id}.json`), 'utf-8',(error,body)=>{
                expect(error).to.be.null

                const {tag: _tag , message:_message, user:_id}= JSON.parse(body);
           
                expect(stickie.tag).to.equal(_tag)
                expect(stickie.message).to.equal(_message)
                expect(stickie.user).to.equal(_id)

                done()
            })
           
        })
    })

    it('Should fail when stickie does not have a message',()=>{
        const stickie = {
            tag: 'Salute',
            message: ''
        }
        expect(() => addStickie(id, stickie,(error, _id) => {})).to.throw(Error, 'is empty or blank')
    })

    it('Should fail when the sticky does not have a tag',()=>{
        const stickie = {
            tag: '',
            message: 'Hello Kaula'
        }

        expect(() => addStickie(id, stickie,(error, _id) => {})).to.throw(Error, 'is empty or blank')
         
    })
    
    it('Should fail on non existing User Id',()=>{
        const stickie = {
            tag: 'Salute',
            message: 'Hello Kaula'
        }
        
        it('Should on adding a stickie',done=>{
            const stickie = {
                tag: 'Salute',
                message: 'Hello Kaula'
            }
            const __id = uid()
            addStickie(__id, stickie,(error, _id) => {            
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.equal(`user with ${__id} does not exist`)
                expect(_id).to.be.undefined

                done()
      
            })
        })
    })
    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
             
            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error)
                    done()
            })
        })
    })    

})