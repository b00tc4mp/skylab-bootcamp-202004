describe('Retrieve Crypto History', () => {

    it('should succeed on retrieve crypto history', done=>{
        retrieveCryptoHistory('bitcoin',(error, data)=>{

            expect(error).to.be.undefined
            expect(data.length > 0).to.be.true
            expect(Array.isArray(data)).to.be.true
            done()
        })
    })

    
    it('should fail on non-function callback', () => {
        expect(() => {
            retrieveCryptoHistory()
        }).to.throw(TypeError, 'undefined is not a function')

        expect(() => {
            retrieveCryptoHistory('btc')
        }).to.throw(TypeError, 'undefined is not a function')
    })

    
})

