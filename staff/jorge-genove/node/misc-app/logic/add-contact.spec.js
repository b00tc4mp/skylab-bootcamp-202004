const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')

describe('logic - addContact', () => {
    let contact = {}

    let user = {}
    
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id

    let _name, _surname, _email, phone, birth, country, contactId

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error) //TODO

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                id = uid()

                _name = `name-${random()}`
                _surname = `surname-${random()}`
                _email = `e-${random()}@mail.com`
                phone = `phone-${random()}`
                birth = `birth-${random()}`
                country = `country-${random()}`
                contactId = uid()
                
                user = { name, surname, email, password, id }
                contact = {_name, _surname, _email, phone, birth, country, contactId,id}

                fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(user), error => {debugger
                    if (error) return done(error)

                    done()
                })
            })
        })
    })

    it('should create a contact on valid data and valid user id', (done) => {debugger
      addContact(contact,id, (error, contactId) => {
        expect(error).to.be.null
        expect(contactId).to.be.a("string")
        fs.readFile(path.join(__dirname, "..", "data", "contacts", `${contactId}.json`),(error, content) => {
            expect(error).to.be.null
            expect(content).to.exist
            
           const constanContent = JSON.parse(content)
            expect(constanContent._name).to.be.equal(_name)
            expect(constanContent._surname).to.be.equal(_surname)
            expect(constanContent._email).to.be.equal(_email)
            expect(constanContent.phone).to.be.equal(phone)
            expect(constanContent.birth).to.be.equal(birth)
            expect(constanContent.country).to.be.equal(country)
            expect(constanContent.contactId).to.be.equal(contactId)
            expect(constanContent.id).to.be.equal(id) 
            done();

      })
    })
  })  
  it('should trhow an error when user id dont exist', (done) => {debugger
    addContact(contact, '13213213', (error, content) => {debugger
      debugger
      expect(error).to.exist
      expect(content).to.be.undefined
      expect(error.message).to.be.equal('user dont exist')
      done()
    })
  })
  it("When the credentials do not meet the format criteria", function () {
    
    
    afterEach((done) => {
    deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
      if (error) return done(error)

      deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
          if (error) return done(error)

        })
    })
  })
    /*   expect(function () {
      addContact(1, id, () => {});
    }).to.throw(TypeError, "1 is not an object"); 
    expect(function () {
      addContact(undefined, id, () => {});
    }).to.throw(TypeError, "undefined is not an object");
    expect(function () {
      addContact(true, id, () => {});
    }).to.throw(TypeError, "true is not an object");
   
     expect(function () {
      addContact([], id, () => {});
    }).to.throw(Error, " is not an object"); 
     expect(function () {
      addContact(function () {},id,() => {});
    }).to.throw(TypeError, "function () {} is not an object");
    expect(function () {
      addContact({}, id, () => {});
    }).to.throw(TypeError, "[object Object] is not an object");
    expect(function () {
      addContact(NaN, id, () => {});
    }).to.throw(TypeError, "NaN is not an object"); 
 */
   
    expect(function () {
      addContact(contact, undefined, () => {});
    }).to.throw(TypeError, "undefined is not a string");
    expect(function () {
      addContact(contact, 1, () => {});
    }).to.throw(TypeError, "1 is not a string");
    expect(function () {
      addContact(contact, true, () => {});
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      addContact(contact, null, () => {});
    }).to.throw(TypeError, "null is not a string");
    expect(function () {
      addContact(contact, [], () => {});
    }).to.throw(TypeError, " is not a string");
    expect(function () {addContact(contact,function () {},() => {});
    }).to.throw(TypeError, "function () {} is not a string");
    expect(function () {
      addContact(contact, {}, () => {});
    }).to.throw(TypeError, "[object Object] is not a string");
    expect(function () {
      addContact(contact, NaN, () => {});
    }).to.throw(TypeError, "NaN is not a string"); 

    expect(function () {
      addContact(contact, password, undefined);
    }).to.throw(TypeError, "undefined is not a function");
    expect(function () {
      addContact(contact, password, 1);
    }).to.throw(TypeError, "1 is not a function");
    expect(function () {
      addContact(contact, password, true);
    }).to.throw(TypeError, "true is not a function");
    expect(function () {
      addContact(contact, password, null);
    }).to.throw(TypeError, "null is not a function");
    expect(function () {
      addContact(contact, password, []);
    }).to.throw(TypeError, " is not a function");
    expect(function () {
      addContact(contact, password, {});
    }).to.throw(TypeError, "[object Object] is not a function");
    expect(function () {
      addContact(contact, password, NaN);
    }).to.throw(TypeError, "NaN is not a function");
  });
});


