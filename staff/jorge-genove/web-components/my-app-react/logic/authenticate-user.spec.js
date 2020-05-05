describe.only('loginUser',  () => {
    let email, password,surname, name


    beforeEach(()=> {done => {
    

        name = names.random()
        surname = surnames.random()
        password = passwords.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
    
        call('POST','https://skylabcoders.herokuapp.com/api/v2/users',
        `{"name":"${name}", "surname":"${surname}","password":"${password}", "email":"${email}" }`,
        {'Content-type': 'application/json'}, (error,status,body) => {
            if(error) return done(new Error(error));
            if(status !== 201) return done(new Error("unexpectet status"))
          
          
        })    
    
    
        done() 
    
    }
    
    })    
 
describe('athenticate user', () => {
    it('should suceed on correct credentials', done=>

        loginUser(email,password,(error, token) =>{
            expect(error).to.be(undefined)
            expect(token).to.exist
            expect(token).not.to.be(undefined)
            expect(token).to.be.a('string')
            
            done()
        })
       
    )

    it('should fail on incorrect credentials (e-mail)', done => {
        const _email = email.substring(0,3) + '-' +email.substring(3)

        loginUser(_email, password, (error,token) => {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('username/or password wrong')
            expect(token).to.be.undefined
        
        done()

        })
    })   
        
    it('should fail on incorret credentials(password)', done => {
        const _password = password.substring(0,3) + '-' + password.substring(3)

        loginUser(email, _password, (error,token) => {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('username and/or password wrong')
            expect(token).to.be.undefined
        done()
        
        })
    })
        
})   
        
    describe ('when user does not exist', () => {
     it('will send user does not exist on inexistent user', done => {
         
         const __email = email.substring(0,3) + '-' +email.substring(3)
     
     
        loginUser(__email, password, (error, token) => {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('username and/or password wrong')
            expect(token).to.be.undefined
        
            done()
        })
     
        })
    })   
        
    

    it('When the credentials do not meet the format criteria',function(){
        expect(function(){
            loginUser('adsadasdas.com',password)
        }).to.throw(Error, 'adsadasdas.com is not an e-mail')
    
        expect(function(){
            loginUser(1,password)
        }).to.throw(Error, '1 is not an e-mail')
        expect(function(){
            loginUser(undefined,password)
        }).to.throw(Error, 'undefined is not an email')
        expect(function(){
            loginUser(true,password)
        }).to.throw(TypeError, 'true is not a string')
        expect(function(){
            loginUser(null,password)
        }).to.throw(TypeError, 'null is not a string')
        expect(function(){
           loginUser([],password)
        }).to.throw(TypeError, ' is not a string')
        expect(function(){ 
            loginUser(function(){},password)
        }).to.throw(TypeError, 'function(){} is not a string')
        expect(function(){
            loginUser({},password)
        }).to.throw(TypeError, '[object Object] is not a string')
        expect(function(){
            loginUser(NaN,password)
        }).to.throw(TypeError, 'NaN is not a string')
    
    
       expect(function(){
            loginUser(email,'   ')
        }).to.throw(Error, 'password is empty or blank')
    
        expect(function(){
            loginUser(email,'')
        }).to.throw(Error, 'password is empty or blank')
        
        expect(function(){
            loginUser(email,undefined)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function(){
            loginUser(email,1)
        }).to.throw(TypeError, '1 is not a string')
        expect(function(){
            loginUser(email,true)
        }).to.throw(TypeError, 'true is not a string')
        expect(function(){
            loginUser(email,null)
        }).to.throw(TypeError, 'null is not a string')
        expect(function(){
           loginUser(email,[])
        }).to.throw(TypeError, ' is not a string')
        expect(function(){ 
            loginUser(email,function(){})
        }).to.throw(TypeError, 'function(){} is not a string')
        expect(function(){
            loginUser(email,{})
        }).to.throw(TypeError, '[object Object] is not a string')
        expect(function(){
            loginUser(email,NaN)
        }).to.throw(TypeError, 'NaN is not a string') 
    
    })
    
afterEach(done => {
    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
    `{"username": "${email}", "password": "${password}}`,
    { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(error)
                if (status !== 200) return done(new Error(`unexpected status ${status}`))

                const { token } = JSON.parse(body)

                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "password": "${password}" }`,
                    {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 204) return done(new Error(`undexpected status ${status}`))

                       
                    })
            })
    
            done()
    
        })
})

 

