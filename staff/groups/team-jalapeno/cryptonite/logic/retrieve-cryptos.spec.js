describe('retrieve-cryptos',  ()=>{
    
    it('should return', done =>{
        retrieveCryptos((error, data)=>{
            if(error) return done(new Error(error))
            expect(error).to.be.undefined

            expect(data).to.exist
            expect(data.length).to.equal(12)
            

        }) 


    })

    it('should fail if callback is not a function')
    
    it('should fail if callback is not a function')


})