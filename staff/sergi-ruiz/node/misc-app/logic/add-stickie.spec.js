
const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const addStickie = require('../logic/add-stickie')


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
                email = `${random()}@mail.com`;
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
 
    it('Sould sucess to add a stickie',done=>{
        const stickie = {
            tag: 'Go dinner',
            message: 'Diner at 8:00 a.m.'
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

    it('Sould fail wend don`t have tag stickie',()=>{
        const stickie = {
            tag: '',
            message: 'Diner at 8:00 a.m.'
        }

        expect(() => addStickie(id, stickie,(error, _id) => {})).to.throw(Error, 'is empty or blank')
         
    })
    
    it('Sould fail wend don`t have message stickie',()=>{
        const stickie = {
            tag: 'Diner',
            message: ''
        }
        expect(() => addStickie(id, stickie,(error, _id) => {})).to.throw(Error, 'is empty or blank')
    })

    it('Sould fail wend don`t exist userId',()=>{

        const stickie = {
            tag: 'Go dinner',
            message: 'Diner at 8:00 a.m.'
        }
        
        it('Sould sucess to add a stickie',done=>{
            const stickie = {
                tag: 'Go dinner',
                message: 'Diner at 8:00 a.m.'
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

    

