const register = require('./register-user');
const assert = require('assert')
const { random } = Math

const authenticate = require('./authenticate-user');


{
    let name = `name-${random()}`;
    let surname = `surname${random()}`;
    let email = `${random()}@mail.com`;
    let password = `${random()}` 

    register({name,surname,email,password},(error, id)=>{
        assert(!error);
       assert(id)
        authenticate({email,password},(error, body)=>{
           assert(!error)

           assert(id,_id)
        })
        
    })
          
           
}    
