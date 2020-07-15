
describe('retrieve-cryptos', () => {

    it('should return a cryptos list length 12', done => {
        retrieveCryptos((error, data) => {

            expect(error).to.be.undefined

            expect(data).to.exist
            expect(data.length).to.equal(12)

            done()
        })
    })

    it('should fail if callback is not a function', () => {

        expect(() => retrieveCryptos('hello world')).to.throw(Error)
    })

})