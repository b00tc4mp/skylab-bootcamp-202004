describe("linkskylabtrello",()=>{
    let name,surname,email,password;
    beforeEach(()=>{
        expect(localStorage.trello_token).to.not.be.undefined
        Trello.setToken(localStorage.trello_token)
        name=Math.random().toString()
        surname=Math.random().toString()
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password="123123123"

    })
    it("should insert patch the the trello_token in a user in the skylab api",(done)=>{
        call("POST","https://skylabcoders.herokuapp.com/api/v2/users",
        `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
        { 'Content-type': 'application/json' },
        (error,status,body)=>{
            //Coger su token
            call("POST","https://skylabcoders.herokuapp.com/api/v2/users/auth",
            `{ "username": "${email}","password": "${password}" }`, {"Content-type": "application/json"},(error,status,body)=>{
                
                const token=JSON.parse(body).token
                linkskylabtrello((error)=>{
                    if(!error){
                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', 
                        undefined, 
                        { "Authorization": `Bearer ${token}`}, 
                        (error, status, body) => {
                            if(error) return done(error)
                            if(status==200){
                                const user = JSON.parse(body)
                                expect(user.name).to.equal(name)
                                expect(user.surname).to.equal(surname)
                                expect(user.username).to.equal(email)
                                expect(user.trello_token).to.equal(Trello.token())
                                call("DELETE","https://skylabcoders.herokuapp.com/api/v2/users",`{ "password": "${password}"}`,
                                {"Content-type": "application/json", "Authorization": `Bearer ${token}`},(error,status,body)=>{
                                    expect(error).to.be.undefined
                                    expect(status).to.equal(204)
                                    expect(body).to.equal("")
                                    done()
                                })
                            }else{
                                done(new Error(JSON.parse(body).error))
                            }
                        }
                    )
                    }else{
                        done(error)
                    }
                },token,Trello.token())
            })
        })
    })
    it("should throw an error if called with the wrong type of parameters",()=>{
        expect(function(){
            linkskylabtrello(undefined,"123423412",Trello.token())
        }).to.throw(TypeError, undefined +" is not a function");
        expect(function(){
            linkskylabtrello("notafunction","123423412",Trello.token())
        }).to.throw(TypeError, "notafunction" +" is not a function");
        expect(function(){
            linkskylabtrello(()=>{},123,Trello.token())
        }).to.throw(TypeError, 123 +" is not a string");
        expect(function(){
            linkskylabtrello(()=>{},undefined,Trello.token())
        }).to.throw(TypeError, undefined +" is not a string");
        expect(function(){
            linkskylabtrello(()=>{},"123423412",undefined)
        }).to.throw(TypeError, undefined +" is not a string");
        expect(function(){
            linkskylabtrello(()=>{},"123423412",123456)
        }).to.throw(TypeError, 123456 +" is not a string");
    })
    it("should receive an error if given an invalid skylab token",(done)=>{
        linkskylabtrello((error)=>{
            expect(error).to.not.be.undefined
            expect(error.message).to.equal("invalid token")
            done()
        },"1234",Trello.token())
    })
})