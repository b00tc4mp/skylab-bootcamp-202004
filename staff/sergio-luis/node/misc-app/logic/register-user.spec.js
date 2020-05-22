const register = require('./register-user');
const assert = require('assert')
const { random } = Math
const fs = require('fs')
const path = require('path')


// //Happy path
{
    let name = `name-${random()}`;
    let surname = `surname${random()}`;
    let email = `${random()}@mail.com`;
    let password = `${random()}` 

    register({name,surname,email,password},(error, id)=>{
        assert(!error);
        assert(typeof id === 'string');

        fs.readFile(path.join(__dirname,'..','data','users',`${id}.json`), 'utf-8',(error,body)=>{
     
            assert(!error);

            assert(body)

            const {name: _name , surname:_surname,email:_email, password:_password ,id:_id}= JSON.parse(body);

            assert.equal(_name,name);
            assert.equal(_surname,surname)
            assert.equal(_email,email)
            assert.equal(_password,password)
            assert.equal(_id,id)
          
            fs.unlink(path.join(__dirname,"..","data","users",`${id}.json`),(error)=>{
                assert(!error)
                fs.access(path.join(__dirname,"..","data","users",`${id}.json`),fs.F_OK,(error)=>{
                    assert(error);
                    assert.equal(error.message,`ENOENT: no such file or directory, access '/Users/sergioluis/bootcamp/collab/skylab-bootcamp-202004/staff/sergio-luis/node/misc-app/data/users/${id}.json'`)
                })  
            })
        })
    })
}    

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
    