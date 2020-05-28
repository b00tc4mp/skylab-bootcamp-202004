const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const retrieve = require('../logic/retrieve-user');

describe('retrieveUser', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
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


    it('Sould sucess to retrieve user',()=>{
       
        return retrieve(id)
            .then(user => {
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.be.undefined
                expect(user.id).to.be.undefined
            })
    })

    it('Sould fail wend user id don`t exist',()=>{
        const _id = uid()
        
        retrieve(_id)
            .then(() => {throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.equal(`user with id ${_id} does not exist`);
            })
    })

    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })    

})

    

  
