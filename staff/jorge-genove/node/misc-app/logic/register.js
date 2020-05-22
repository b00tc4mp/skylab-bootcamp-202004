const fs = require("fs");
const path = require("path");
const uid = require('../utils/uid')
const Email = require('../utils/email')
require('../utils/string')

function register({name, surname, email, password}, callback) {
  String.validate.alphabetic(name);
  String.validate.alphabetic(surname);

  Email.validate(email);
  String.validate.lengthGreaterEqualThan(password, 8); 
  let matched = false 

  fs.readdir(path.join(__dirname, "..", "data", "users"), (error, files) => {
    if (error) throw error;
    let count = 0;
    
  if(files.length === 0){ 
    
    const id = uid()

    const file = `${id}.json`

    const _user = {
        name,
        surname,
        email,
        password,
        user: id
    }
    
    
    fs.writeFile(path.join(__dirname, "..", "data", "users",file), JSON.stringify(_user, null, 4), error => {
    if (error) throw error

    callback(null, _user )
})
}else {
  
    files.forEach((file) => {
     
      
      fs.readFile(
        path.join(__dirname, "..", "data", "users", file),
        (error, data) => {
          if (error) throw error;
         
          const { email: _email } = JSON.parse(data);
         
         
          if (_email === email) matched = true
          
            
           count++;
            
          if (count === files.length ) {
            const id = uid()

            const file = `${id}.json`

            const _user = {
                name,
                surname,
                email,
                password,
                
            }
            console.log(_user)
            fs.writeFile(path.join(__dirname, "..", "data", "users", file), JSON.stringify(_user, null, 4), error => {
                if (error) throw error

                callback(null, matched )
            
            });
          }
        }
      );
    });
}
  });
}

module.exports = register  


/* const fs = require("fs");
const path = require("path");
const uid = require('../utils/uid')
const Email = require('../utils/email')
require('../utils/string')

function register({name, surname, email, password}, callback) {
  String.validate.alphabetic(name);
  String.validate.alphabetic(surname);

  Email.validate(email);
  String.validate.lengthGreaterEqualThan(password, 8);

  fs.readdir(path.join(__dirname, "..", "data", "contacts"), (error, files) => {
    if (error) throw error;
    let count = 0;
console.log(count)
    files.forEach((file) => {

      fs.readFile(
        path.join(__dirname, "..", "data", "contacts", file),
        (error, data) => {
          if (error) throw error;

          const { email: _email } = data;

          if (_email === email)
            throw new Error("User with this email already registered");
          else count++;

          if (count === files.length - 1) {
            const id = uid()

            const file = `${id}`.json

            const _user = {
                name,
                surname,
                email,
                password,
                user: id
            }

            fs.writeFile(path.join(__dirname, "..", "data", "contacts", file), JSON.stringify(_user, null, 4), error => {
                

                callback(null, id)

            });
          }
        }
      );
    });
  });
}

module.exports = register  */