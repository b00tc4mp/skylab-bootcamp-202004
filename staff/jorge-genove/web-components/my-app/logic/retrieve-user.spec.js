describe('retrieveUser', function () {
    let name, surname, email, password


    beforeEach(function() {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        password = passwords.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
    
        users.push( {
            name: name,
            surname: surname,
            password: password,
            email: email
        })
    })    
 
 
     it('must retrieve the user by the email', function(){
        expect(retrieveUser(email)
        ).to.exist
        var result = retrieveUser(email) 
        expect(result).to.exist
        expect(result).to.eql( {name: name,
                 surname: surname,
                 _email: email})   
        expect(result.name).to.equal(name)
        expect(result._email).to.equal(email)   
        expect(result.surname).to.equal(surname)
        
    
    }) 
 
    it('When the credentials do not meet the format criteria',function(){
        expect(function(){
            retrieveUser('adsadasdas.com')
        }).to.throw(Error, 'adsadasdas.com is not an e-mail')
    
        expect(function(){
            retrieveUser(1)
        }).to.throw(TypeError, '1 is not a string')
        expect(function(){
            retrieveUser(undefined)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function(){
            retrieveUser(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(function(){
            retrieveUser(null)
        }).to.throw(TypeError, 'null is not a string')
        expect(function(){
           retrieveUser([])
        }).to.throw(TypeError, ' is not a string')
        expect(function(){ 
            retrieveUser(function(){})
        }).to.throw(TypeError, 'function(){} is not a string')
        expect(function(){
            retrieveUser({})
        }).to.throw(TypeError, '[object Object] is not a string')
        expect(function(){
            retrieveUser(NaN)
        }).to.throw(TypeError, 'NaN is not a string')
    
    
      
    })
    

 
}) 

   