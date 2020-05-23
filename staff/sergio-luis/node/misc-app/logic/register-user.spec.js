const register = require('./register-user');
const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
describe('registerUser', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            name = `name-${random()}`;
            surname = `surname${random()}`;
            email = `${random()}@mail.com`;
            password = `${random()}` ;

            done()
        })
    })


    it('Sould sucess to creat a new user',done=>{
    
        register({name,surname,email,password},(error, id)=>{
            console.log(error)
            expect(error).to.be.null
            expect(id).to.exist

            fs.readFile(path.join(__dirname,'..','data','users',`${id}.json`), 'utf-8',(error,body)=>{
                expect(error).to.be.null
                const {name: _name , surname:_surname,email:_email, password:_password ,id:_id}= JSON.parse(body);
           
                expect(name).to.equal(_name)
                expect(surname).to.equal(_surname)
                expect(email).to.equal(_email)
                expect(password).to.equal(_password)
                expect(id).to.equal(_id)

                done()
            })
        })
    })
    
    // afterEach(done=>{
        
    // })

})

    

  

// //UNHAPPY //TODO problem with feedback!!
// {
//     let name = `name-${random()}`;
//     let surname = `surname${random()}`;
//     let email = `${random()}@mail.com`;
//     let password = `${random()}` 

//     register({name,surname,email,password},(error, id)=>{
//         assert(!error);
//         assert(typeof id === 'string');

//         fs.readFile(path.join(__dirname,'..','data','users',`${id}.json`), 'utf-8',(error,body)=>{
     
//             assert(!error);

//             assert(body)

//             const {name: _name , surname:_surname,email:_email, password:_password ,id:_id}= JSON.parse(body);

//             assert.equal(_name,name);
//             assert.equal(_surname,surname)
//             assert.equal(_email,email)
//             assert.equal(_password,password)
//             assert.equal(_id,id)
          
//             register({name,surname,email,password},(error, body)=>{
//                 cdebugger
//                 console.log(body)
//                 assert(!error)
//                 assert(body);
//                 assert.equal(body,'The user already exist');
//             })    

//             fs.unlink(path.join(__dirname,"..","data","users",`${id}.json`),(error)=>{
//                 assert(!error)
//                 // fs.access(path.join(__dirname,"..","data","users",`${id}.json`),fs.F_OK,(error)=>{
//                 //     assert(error);
//                 //     assert.equal(error.message,`ENOENT: no such file or directory, access '/Users/sergioluis/bootcamp/collab/skylab-bootcamp-202004/staff/sergio-luis/node/misc-app/data/users/${id}.json'`)
                
//             })
//         })
//     })
// }

//     // try{
//     //     addStickie({name:undefined ,tag ,comment},(error, id)=>{
//     //         assert.equal(true,false)
//     //     })
//     // }catch({message}){
//     //
//     // }
    
//     // assert.throws(()=>{
//     //     addStickie({name:undefined ,tag ,comment},(error, id)=>{
            
//     //         assert.equal(true,false)
//     //     })
//     // },TypeError)
    