describe("search-album", () => {
    it("should find a track with the given query", (done) => {
      let token ="BQDcMbf7MuW3qQxUD1dMNueMlZXCAYsh37nyvv8of5gdnU_Z554KIaXUR2uKdJThMJv1VMe1k5QhsKbnEK9Vr6K5PVbimyYNQ9lEhpzWHhqJRyXVvfhHue5z4zHQwmte5J-R3yDRrUjsbthH372fIdefkI-2Rz51v0v8FdpgeyN3zl-heYBfqJGv_3cz";
      let query = "yo minoria absoluta";
      
      searchAlbum(token, query, (error, results) => {
        expect(error).to.be.undefined;
  
        expect(results).to.exist;
        expect(results).to.be.an("array");
        expect(results.length).to.be.greaterThan(0);
  
        results.forEach((result) => {
             
          expect(result).to.be.an("object");
          expect(result.name).to.exist;
          expect(result.name).to.be.a("string");
          expect(result.artistsArray).to.exist; 
          expect(result.artistsArray).to.be.a("array");
          expect(result.artistsArray.length).to.be.greaterThan(0)
          expect(result.id).to.exist;
          expect(result.id).to.be.a("string");
          expect(result.image).to.be.a("string")
          expect(result.image).to.exist 
        });
        done();
      });
    });
     
     it("should throw an error when token its wrong", (done) => {
      query = "chill beats";
      token = '456'
      searchAlbum(token, query, (error, results) => {
         ;
        expect(results).to.undefined;
        expect(error).to.exist;
        expect(error).to.be.an.instanceOf(Error)
  
        done();
      });
    }); 
  
   
  
    it('should fail when token its not a string', () => {
          let query = 'hola'
          
           expect(()=>{
               searchAlbum(12, query, function(){})
           }).to.throw(TypeError, '12 is not a string')
          
           expect(()=>{
               searchAlbum(null, query, function(){})
           }).to.throw(TypeError, 'null is not a string')
  
           expect(()=>{
               searchAlbum(()=>{}, query, function(){})
           }).to.throw(TypeError, '()=>{} is not a string')
  
           expect(()=>{
               searchAlbum(true, query, function(){})
           }).to.throw(TypeError, 'true is not a string')
          
           expect(()=>{
               searchAlbum(NaN, query, function(){})
           }).to.throw(TypeError, 'NaN is not a string')
  
           expect(()=>{
               searchAlbum({}, query, function(){})
           }).to.throw(TypeError, '[object Object] is not a string')
  
           expect(()=>{
               searchAlbum(undefined, query, function(){})
           }).to.throw(Error, 'undefined is not a string')
          })
      
      
          it('should fail when query its not a string', () => {
              let token = 'hola'
              
               expect(()=>{
                   searchAlbum(token, 12, function(){})
               }).to.throw(TypeError, '12 is not a string')
              
               expect(()=>{
                   searchAlbum(token, null, function(){})
               }).to.throw(TypeError, 'null is not a string')
      
               expect(()=>{
                   searchAlbum(token, ()=>{}, function(){})
               }).to.throw(TypeError, '()=>{} is not a string')
      
               expect(()=>{
                   searchAlbum(token, true, function(){})
               }).to.throw(TypeError, 'true is not a string')
              
               expect(()=>{
                   searchAlbum(token, NaN, function(){})
               }).to.throw(TypeError, 'NaN is not a string')
      
               expect(()=>{
                   searchAlbum(token, {}, function(){})
               }).to.throw(TypeError, '[object Object] is not a string')
      
               expect(()=>{
                   searchAlbum(token, undefined, function(){})
               }).to.throw(Error, 'undefined is not a string')
              })
          
  
              it('should fail when function its not a function', () => {
                  let token = 'hola'
                  let query = 'hola'
                   
                  expect(()=>{
                       searchAlbum(token, query, 12)
                   }).to.throw(TypeError, '12 is not a function')
                  
                   expect(()=>{
                       searchAlbum(token, query, null)
                   }).to.throw(TypeError, 'null is not a function')
          
                   expect(()=>{
                       searchAlbum(token, query, 'hola')
                   }).to.throw(TypeError, 'hola is not a function')
          
                   expect(()=>{
                       searchAlbum(token, query, true)
                   }).to.throw(TypeError, 'true is not a function')
                  
                   expect(()=>{
                       searchAlbum(token, query, NaN)
                   }).to.throw(TypeError, 'NaN is not a function')
          
                   expect(()=>{
                       searchAlbum(token, query, {})
                   }).to.throw(TypeError, '[object Object] is not a function')
          
                   expect(()=>{
                       searchAlbum(token, query, undefined)
                   }).to.throw(Error, 'undefined is not a function')
                  }) 
   
  })
  
   