describe('search-playlist', () => {
    let query;
    let token;
    // it('should find a playlists with the given query', done => {
    //     let token = "BQClGZQz1FfLVlVTDKiO2oGxg2MjbEs_5BYy5b1afDBGRjGYlPk9BxVC3ajUOWlAz3NslwBgKlWTAzQSfHtanOLsCIkNHw_f8kaSGPEWe7agzL_uWWzlxdj9MmB34Eh0owH4NA"
    //     let query = "chill beats"
    //     searchPlaylists(token, query, (error, results) => {
        
    //         expect(error).to.be.undefined
            
    //         expect(results).to.exist
    //         expect(results).to.be.an('array')
    //         expect(results.length).to.be.greaterThan(0)
            
    //         results.forEach(result => {
    //             expect(result).to.be.an('object')
    //             expect(result.name).to.exist
    //             expect(result.name).to.be.a('string')
    //             expect(result.description).to.exist
    //             expect(result.description).to.be.a('string')
    //             expect(result.images).to.exist
    //             expect(result.images).to.be.a('string')
    //             expect(result.id).to.exist
    //             expect(result.id).to.be.a('string')
    //         })
    //         done()    
    //     })
    // })

    it('should throw an error when token its wrong', done => {
        
        query = "chill beats"
         
        searchPlaylists("1234", query, (error, results) => {
             
            expect(results).to.be.undefined
            expect(error).to.exist
            
            done()
        })
    })
    

    it('should fail when token its not a string', () => {
        query = 'hola'
        
        expect(()=>{
            searchPlaylists(12, query, function(){})
        }).to.throw(TypeError, '12 is not a string')
        
        expect(()=>{
            searchPlaylists(null, query, function(){})
        }).to.throw(TypeError, 'null is not a string')

        expect(()=>{
            searchPlaylists(()=>{}, query, function(){})
        }).to.throw(TypeError, '()=>{} is not a string')

        expect(()=>{
            searchPlaylists(true, query, function(){})
        }).to.throw(TypeError, 'true is not a string')
        
        expect(()=>{
            searchPlaylists(NaN, query, function(){})
        }).to.throw(TypeError, 'NaN is not a string')

        expect(()=>{
            searchPlaylists({}, query, function(){})
        }).to.throw(TypeError, '[object Object] is not a string')

        expect(()=>{
            searchPlaylists(undefined, query, function(){})
        }).to.throw(Error, 'undefined is not a string')
    });
    
    
    it('should fail when query its not a string', () => {
        token = 'hola'
        
        expect(()=>{
            searchPlaylists(token, 12, function(){})
        }).to.throw(TypeError, '12 is not a string')
        
        expect(()=>{
            searchPlaylists(token, null, function(){})
        }).to.throw(TypeError, 'null is not a string')

        expect(()=>{
            searchPlaylists(token, ()=>{}, function(){})
        }).to.throw(TypeError, '()=>{} is not a string')

        expect(()=>{
            searchPlaylists(token, true, function(){})
        }).to.throw(TypeError, 'true is not a string')
        
        expect(()=>{
            searchPlaylists(token, NaN, function(){})
        }).to.throw(TypeError, 'NaN is not a string')

        expect(()=>{
            searchPlaylists(token, {}, function(){})
        }).to.throw(TypeError, '[object Object] is not a string')

        expect(()=>{
            searchPlaylists(token, undefined, function(){})
        }).to.throw(Error, 'undefined is not a string')
    })
        

    it('should fail when function its not a function', () => {
        token = 'hola'
        query = 'hola'
        
        expect(()=>{
            searchPlaylists(token, query, 12)
        }).to.throw(TypeError, '12 is not a function')
        
        expect(()=>{
            searchPlaylists(token, query, null)
        }).to.throw(TypeError, 'null is not a function')

        expect(()=>{
            searchPlaylists(token, query, 'hola')
        }).to.throw(TypeError, 'hola is not a function')

        expect(()=>{
            searchPlaylists(token, query, true)
        }).to.throw(TypeError, 'true is not a function')
        
        expect(()=>{
            searchPlaylists(token, query, NaN)
        }).to.throw(TypeError, 'NaN is not a function')

        expect(()=>{
            searchPlaylists(token, query, {})
        }).to.throw(TypeError, '[object Object] is not a function')

        expect(()=>{
            searchPlaylists(token, query, undefined)
        }).to.throw(Error, 'undefined is not a function')
    })

})
    
    // describe("unhappy path", ()=> {

                                                
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })         
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })    
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })    
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })        
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })    
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })    
    //     it('', () => {
    //         expect(() => {
    //             searchPlaylists(token, , (error,results) => {})
    //             })
    //         })
    //     })

    //     it('should fail when token its not a string', () => {
    //         let token = "BQClGZQz1FfLVlVTDKiO2oGxg2MjbEs_5BYy5b1afDBGRjGYlPk9BxVC3ajUOWlAz3NslwBgKlWTAzQSfHtanOLsCIkNHw_f8kaSGPEWe7agzL_uWWzlxdj9MmB34Eh0owH4NA"
    //         let query = "chill beats"
    //         expect(()=>{
    //             searchPlaylists(12, query, (error, results) => {})
    //         }).to.throw(Error, '12 is not a string')
            
    //         expect(()=>{
    //             searchPlaylists(null, query, (error, results) => {})
    //         }).to.throw(Error, 'null is not a string')
    
    //         expect(()=>{
    //             searchPlaylists(()=>{}, query, (error, results) => {})
    //         }).to.throw(Error, '()=>{} is not a string')
    
    //         expect(()=>{
    //             searchPlaylists(true, query, (error, results) => {})
    //         }).to.throw(Error, 'true is not a string')
            
    //         expect(()=>{
    //             searchPlaylists(NaN, query, (error, results) => {})
    //         }).to.throw(Error, 'NaN is not a string')
    
    //         expect(()=>{
    //             searchPlaylists({}, query, (error, results) => {})
    //         }).to.throw(Error, '[object Object] is not a string')
    
    //         expect(()=>{
    //             searchPlaylists(undefined, query, (error, results) => {})
    //         }).to.throw(Error, 'undefined is not a string')
    
    //     })
        

    //     it('should fail when number is not a function', ()=>{
    //         let token = "asfasadsd"
    //         let query = "chill beats"
    //         expect(()=>
    //             searchPlaylists(token, query , 12 )
    //         ).to.throw(Error, '12 is not a function')
    //     })
    //     it('it should fail when null is not a function', ()=>{
    //         expect(()=>{
    //             searchPlaylists(token, query, null)
    //         }).to.throw(Error, 'null is not a function')
    //     })
    //     it('should fail when string is not a function', ()=>{
    //         expect(()=>{
    //             searchPlaylists(token, query, "")
    //         }).to.throw(Error, '"" is not a function')
    //     })
    //     it('should fail when boolean is not a function', ()=>{
    //         expect(()=>{
    //             searchPlaylists(token, query, true)
    //         }).to.throw(Error, 'true is not a function')
    //     })
    //     it('should fail when NaN is not a function', ()=>{
    //         expect(()=>{
    //             searchPlaylists(token, query ,NaN)
    //         }).to.throw(Error, 'NaN is not a function')
    //     })
    //     it('it should fail when object is not a function', ()=>{
    //         expect(()=>{
    //             searchPlaylists(token, query, {})
    //         }).to.throw(Error, '[object Object] is not a function')
    //     })
    //     it('it should fail when undefined is not a function', ()=>{
    //         expect(()=>{
    //             searchPlaylists(token, query, undefined)
    //         }).to.throw(Error, 'undefined is not a function')
    //     })
        
    // })
    

//     describe('when user already exists', () => {
//         beforeEach(done => {
//             call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
//                 `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
//                 { 'Content-type': 'application/json' },
//                 (error, status, body) => {
//                     if (error) return done(new Error(error.message))
//                     if (status !== 201) return done(new Error(`unexpected status ${status}`))

//                     done()
//                 })
//         })

//         it('should fail alerting user already exists', done => {
//             registerUser(name, surname, email, password, error => {
//                 expect(error).to.exist

//                 expect(error.message).to.equal(`user with username \"${email}\" already exists`)

//                 done()
//             })
//         })
    
    
    
       
        

  

//   it('should fail on non-string field', () => {
//     expect(() => {
//         registerUser(undefined, surname, email, password, function () { })
//     }).to.throw(TypeError, 'undefined is not a string')

//     expect(() => {
//         registerUser(1, surname, email, password, function () { })
//     }).to.throw(TypeError, '1 is not a string')

//     expect(() => {
//         registerUser(true, surname, email, password, function () { })
//     }).to.throw(TypeError, 'true is not a string')

//     expect(() => {
//         registerUser(name, undefined, email, password, function () { })
//     }).to.throw(TypeError, 'undefined is not a string')

//     expect(() => {
//         registerUser(name, 1, email, password, function () { })
//     }).to.throw(TypeError, '1 is not a string')

//     expect(() => {
//         registerUser(name, true, email, password, function () { })
//     }).to.throw(TypeError, 'true is not a string')

//     // TODO same for the other fields
// })

// it('should fail on non-alphabetic field', () => {
//     expect(() => {
//         registerUser('1', surname, email, password, function () { })
//     }).to.throw(Error, '1 is not alphabetic')

//     expect(() => {
//         registerUser('$', surname, email, password, function () { })
//     }).to.throw(Error, '$ is not alphabetic')

//     expect(() => {
//         registerUser('%', surname, email, password, function () { })
//     }).to.throw(Error, '% is not alphabetic')

//     expect(() => {
//         registerUser(name, '&', email, password, function () { })
//     }).to.throw(Error, '& is not alphabetic')

//     expect(() => {
//         registerUser(name, '(', email, password, function () { })
//     }).to.throw(Error, '( is not alphabetic')

//     expect(() => {
//         registerUser(name, '?', email, password, function () { })
//     }).to.throw(Error, '? is not alphabetic')

   
// })

// it('should fail on non-function callback', () => {
//     expect(() => {
//         registerUser(name, surname, email, password, 1)
//     }).to.throw(TypeError, '1 is not a function')

//     expect(() => {
//         registerUser(name, surname, email, password, true)
//     }).to.throw(TypeError, 'true is not a function')

//     expect(() => {
//         registerUser(name, surname, email, password, 'text')
//     }).to.throw(TypeError, 'text is not a function')

//     expect(() => {
//         registerUser(name, surname, email, password)
//     }).to.throw(TypeError, 'undefined is not a function')
// })


// })  
        


   
