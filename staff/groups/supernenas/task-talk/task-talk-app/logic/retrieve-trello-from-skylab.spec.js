describe("retrieveTrelloFromSkylab",()=>{
    let name,surname,email,password,secretToken;
    beforeEach(()=>{
        name=Math.random().toString()
        surname=Math.random().toString()
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password="123123123"
        secretToken=Math.random().toString()
    })
    it("should retrieve the trello token stored in the users api",(done)=>{
        call("POST","https://skylabcoders.herokuapp.com/api/v2/users",
        `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
        { 'Content-type': 'application/json' },
        (error,status,body)=>{
            //Coger su token
            call("POST","https://skylabcoders.herokuapp.com/api/v2/users/auth",
            `{ "username": "${email}","password": "${password}" }`, {"Content-type": "application/json"},(error,status,body)=>{
                
                const token=JSON.parse(body).token
                call("PATCH", 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"trello_token":"${secretToken}"}`, { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
                (error, status, body) => {
                    if (error) return done(error)
                    if(status!==204){
                        return done(new Error(JSON.parse(body).error))
                    }
                    retrieveTrelloFromSkylab(token,(error,trello)=>{
                        if(error) return done(error)
                        expect(trello).to.equal(secretToken)
                        call("DELETE","https://skylabcoders.herokuapp.com/api/v2/users",`{ "password": "${password}"}`,
                                {"Content-type": "application/json", "Authorization": `Bearer ${token}`},(error,status,body)=>{
                                    expect(error).to.be.undefined
                                    expect(status).to.equal(204)
                                    expect(body).to.equal("")
                                    done()
                                })
                    })
                })
            })
        })
    })
    it("should thrown an error if called whith the wrong type of parameters",()=>{
        expect(function(){
            retrieveTrelloFromSkylab(undefined,()=>{})
        }).to.throw(TypeError, undefined+" is not a string")
        expect(function(){
            retrieveTrelloFromSkylab(123,()=>{})
        }).to.throw(TypeError, 123+" is not a string")
        expect(function(){
            retrieveTrelloFromSkylab("123456789",undefined)
        }).to.throw(TypeError, undefined+" is not a function")
        expect(function(){
            retrieveTrelloFromSkylab("123123456","notafunction")
        }).to.throw(TypeError, "notafunction"+" is not a function")
    })
    it("should receive an error if given an invalid token",(done)=>{
        retrieveTrelloFromSkylab("123456789",(error,token)=>{
            expect(error).to.not.be.undefined
            expect(error.message).to.equal("invalid token")
            done()
        })
    })
})