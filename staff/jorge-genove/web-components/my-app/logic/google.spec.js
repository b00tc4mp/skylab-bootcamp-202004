describe('google', () => {
 it('should succeed on matching query', done => {
     googleSearch('Hello world', function(error, results){
         expect(error).to.be.undefined
         expect(results).to.exit
         expect(results.length).to.be.greaterThan(0)

         results.forEach(({title, content, link}) => {
            expect(title).to.be.a('string')
            expect(content).to.be.a('string')
            expect(link).to.be.a('string')
         })
     
         done()
        
        })
 
    })
})