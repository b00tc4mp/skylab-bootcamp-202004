/* Version vieja Que me voy a almorzar, copiate las cosas al
describe("retrieveUser", function(){
    
    let name,surname,email,password;
    beforeEach(function(){
        users.length=0;
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
    })
    
    it("should return a specified user", function(){
        users.push({name,surname,email,password});
        let result = retrieveUser(email)
        expect(result).to.deep.equal({name: name, surname:surname, email:email, password: password})
    })

    it("should return an error email is not a string", function(){
        expect(function(){
            retrieveUser(123)
        }).to.throw(TypeError, '123 is not a string') 

    })

    it("should return an error the email does not pass the criteria", function(){
        expect(function(){
            retrieveUser("123")
        }).to.throw(Error, '123 is not an e-mail') 

    })

    it("should return an error if sending no arguments", function(){
        expect(function(){
            retrieveUser()
        }).to.throw(TypeError, undefined+' is not a string') 

    })
    it("should return an error if given an email that doesn't exist in the database", function(){
        expect(function(){
            retrieveUser("pepitogrillo69@gmail.com")
        }).to.throw(TypeError, "couldn't find user with that email") ;

    })
})
*/
describe("retrieveUser", function(){
    
    let name,surname,email,password;
    beforeEach(function(){
        users.length=0;
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
    })
    it("should return the information of a specified user",(done)=>{
        //Crear al usuario de estrangis
        call("POST","https://skylabcoders.herokuapp.com/api/v2/users",
        `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
        { 'Content-type': 'application/json' },
        (error,status,body)=>{
            //Coger su token
            call("POST","https://skylabcoders.herokuapp.com/api/v2/users/auth",
            `{ "username": "${email}","password": "${password}" }`, {"Content-type": "application/json"},(error,status,body)=>{
                
                const token=JSON.parse(body).token;
                //Provamos el retrieve
                retrieveUser(token,(error,user)=>{
                    //Comprobamos que los valores son los que habíamos puesto
                    expect(error).to.be.undefined;
                    expect(user.name).to.equal(name);
                    expect(user.surname).to.equal(surname);
                    expect(user.email).to.equal(email);
                    //Ahora que lo hemos comprobado borramos el nombre de la lista
                    call("DELETE","https://skylabcoders.herokuapp.com/api/v2/users",`{ "password": "${password}"}`,
                    {"Content-type": "application/json", "Authorization": `Bearer ${token}`},(error,status,body)=>{
                        expect(error).to.be.undefined;
                        expect(status).to.equal(204);
                        expect(body).to.equal("");
                        done();
                    })
                })
            })

        })
    }).timeout(5000)
})