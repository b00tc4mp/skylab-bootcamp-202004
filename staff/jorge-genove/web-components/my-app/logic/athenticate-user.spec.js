describe('authenticateUser', function () {
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
 

    it('must pass the authenticate and dont throw error', function(){

        
        
        expect(function(){
            authenticateUser(email, password)

            
        }).not.to.throw(Error)
    })
    it('must throw an error when credentials are wrong', function(){
        expect(function(){
            authenticateUser('holamundo@gmail.com',password)
        }).to.throw(Error)
    
        expect(function(){
            authenticateUser(email, 'qeweqeqeqewqeqeq')
        }).to.throw(Error)
    
    
    })
    it('When the credentials do not meet the format criteria',function(){
        expect(function(){
            authenticateUser('adsadasdas.com',password)
        }).to.throw(Error, 'adsadasdas.com does not match the format')
    
        expect(function(){
            authenticateUser(1,password)
        }).to.throw(TypeError, '1 is not a string')
        expect(function(){
            authenticateUser(undefined,password)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function(){
            authenticateUser(true,password)
        }).to.throw(TypeError, 'true is not a string')
        expect(function(){
            authenticateUser(null,password)
        }).to.throw(TypeError, 'null is not a string')
        expect(function(){
           authenticateUser([],password)
        }).to.throw(TypeError, ' is not a string')
        expect(function(){ 
            authenticateUser(function(){},password)
        }).to.throw(TypeError, 'function(){} is not a string')
        expect(function(){
            authenticateUser({},password)
        }).to.throw(TypeError, '[object Object] is not a string')
        expect(function(){
            authenticateUser(NaN,password)
        }).to.throw(TypeError, 'NaN is not a string')
    
    
       expect(function(){
            authenticateUser(email,'   ')
        }).to.throw(Error, 'password is empty or blank')
    
        expect(function(){
            authenticateUser(email,'')
        }).to.throw(Error, 'password is empty or blank')
        
        expect(function(){
            authenticateUser(email,undefined)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function(){
            authenticateUser(email,1)
        }).to.throw(TypeError, '1 is not a string')
        expect(function(){
            authenticateUser(email,true)
        }).to.throw(TypeError, 'true is not a string')
        expect(function(){
            authenticateUser(email,null)
        }).to.throw(TypeError, 'null is not a string')
        expect(function(){
           authenticateUser(email,[])
        }).to.throw(TypeError, ' is not a string')
        expect(function(){ 
            authenticateUser(email,function(){})
        }).to.throw(TypeError, 'function(){} is not a string')
        expect(function(){
            authenticateUser(email,{})
        }).to.throw(TypeError, '[object Object] is not a string')
        expect(function(){
            authenticateUser(email,NaN)
        }).to.throw(TypeError, 'NaN is not a string') 
    
    })
    


}) 

   