describe('Retrieve Ohlc', () => {

    it('should succeed on retrieve ohlc', done=>{
        retrieveOhlc('bitcoin',(error, data)=>{

            expect(error).to.be.undefined
            expect(data.open).to.exist
            expect(data.high).to.exist
            expect(data.low).to.be.exist
            expect(data.close).to.be.exist
            expect(data).to.be.an('object')


            done()
        })
    })
    
})

