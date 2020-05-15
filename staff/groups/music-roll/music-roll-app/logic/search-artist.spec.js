describe("search-artist", () => {
    it("should find an artist with the given query", (done) => {
      let token ="BQCIVFpHk2RhRbf45HgUw5olpSXb2jE2IRyLXzylnpvSf4azaX7mnNsZ4nQ6btAQf8cPyTvKZ-2B98c0FHwknIktdE5oyF_P-tLWXQkswdXg_xnJFUoIg1x6hQ2134dVBSQ_E5pbzOmhZyDpYuyRBfdCd1BRqOinZpOEOC8_xcOeYgF31tM55S3uV-EL";
      const VALID_QUERIES = ["extremoduro", "platero y tu", "los suaves"];
      const query = VALID_QUERIES.random()
      
      searchArtist(token, query, (error, results) => {
        expect(error).to.be.undefined;
  
        expect(results).to.exist;
        expect(results).to.be.an("array");
        expect(results.length).to.be.greaterThan(0);
  
        results.forEach((result) => {
          debugger
          expect(result).to.be.an("object");
          expect(result.name).to.exist;
          expect(result.name).to.be.a("string");
          expect(result.id).to.exist;
          expect(result.id).to.be.a("string");
          expect(result.images).to.be.a("string")
          expect(result.images).to.exist 
        });
        done();
      });
    })    
     debugger
     it("should throw an error when token its wrong", (done) => {
      query = "chill beats";
      token = '456'
      searchArtist(token, query, (error, results) => {
        debugger;
        expect(results).to.undefined;
        expect(error).to.exist;
        expect(error).to.be.an.instanceOf(Error)
        expect(error.message).to.equal('Invalid access token') 
        done();
      });
    }); 
  
   
  debugger
    it('should fail when token its not a string', () => {
          let query = 'hola'
          
           expect(()=>{
               searchArtist(12, query, function(){})
           }).to.throw(Error, '12 is not a string')
          
           expect(()=>{
               searchArtist(null, query, function(){})
           }).to.throw(Error, 'null is not a string')
  
           expect(()=>{
               searchArtist(()=>{}, query, function(){})
           }).to.throw(Error, '()=>{} is not a string')
  
           expect(()=>{
               searchArtist(true, query, function(){})
           }).to.throw(Error, 'true is not a string')
          
           expect(()=>{
               searchArtist(NaN, query, function(){})
           }).to.throw(Error, 'NaN is not a string')
  
           expect(()=>{
               searchArtist({}, query, function(){})
           }).to.throw(Error, '[object Object] is not a string')
  
           expect(()=>{
               searchArtist(undefined, query, function(){})
           }).to.throw(Error, 'undefined is not a string')
          })
      
      
          it('should fail when query its not a string', () => {
              let token = 'hola'
              
               expect(()=>{
                   searchArtist(token, 12, function(){})
               }).to.throw(Error, '12 is not a string')
              
               expect(()=>{
                   searchArtist(token, null, function(){})
               }).to.throw(Error, 'null is not a string')
      
               expect(()=>{
                   searchArtist(token, ()=>{}, function(){})
               }).to.throw(Error, '()=>{} is not a string')
      
               expect(()=>{
                   searchArtist(token, true, function(){})
               }).to.throw(Error, 'true is not a string')
              
               expect(()=>{
                   searchArtist(token, NaN, function(){})
               }).to.throw(Error, 'NaN is not a string')
      
               expect(()=>{
                   searchArtist(token, {}, function(){})
               }).to.throw(Error, '[object Object] is not a string')
      
               expect(()=>{
                   searchArtist(token, undefined, function(){})
               }).to.throw(Error, 'undefined is not a string')
              })
          
  
              it('should fail when function its not a function', () => {
                  let token = 'hola'
                  let query = 'hola'
                   
                  expect(()=>{
                       searchArtist(token, query, 12)
                   }).to.throw(Error, '12 is not a function')
                  
                   expect(()=>{
                       searchArtist(token, query, null)
                   }).to.throw(Error, 'null is not a function')
          
                   expect(()=>{
                       searchArtist(token, query, 'hola')
                   }).to.throw(Error, 'hola is not a function')
          
                   expect(()=>{
                       searchArtist(token, query, true)
                   }).to.throw(Error, 'true is not a function')
                  
                   expect(()=>{
                       searchArtist(token, query, NaN)
                   }).to.throw(Error, 'NaN is not a function')
          
                   expect(()=>{
                       searchArtist(token, query, {})
                   }).to.throw(Error, '[object Object] is not a function')
          
                   expect(()=>{
                       searchArtist(token, query, undefined)
                   }).to.throw(Error, 'undefined is not a function')
                  }) 
   
  })
  
