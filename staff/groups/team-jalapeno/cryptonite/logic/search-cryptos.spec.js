describe('search cryptos', ()=>{

    it('should succeed with correct coin id ', done =>{
        searchCryptos('bitcoin', (error, response) =>{
            expect(error).to.be.undefined 
            expect(response).to.exist

            done()
         })
    })

    it('should succeed with correct coin name', done =>{
        searchCryptos('Bitcoin', (error, response) =>{
            expect(error).to.be.undefined 
            expect(response).to.exist

            done()
         })
    })

    it('should succeed with correct symbol name', done =>{
        searchCryptos('btc', (error, response) =>{
            expect(error).to.be.undefined 
            expect(response).to.exist

            done()
         })
    })

    it('should succeed with incomplete coin data', done =>{
        searchCryptos('e', (error, response) =>{
            expect(error).to.be.undefined 
            expect(response).to.exist

            done()
        })
    })

})