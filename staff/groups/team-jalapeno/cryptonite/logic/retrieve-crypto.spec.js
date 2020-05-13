describe('retrieve selected crypto', () => {

    it('should return a crypto by id', done => {
        retrieveCrypto('bitcoin', (error, data) => {
            if (error) return done(new Error(error))
            expect(error).to.be.undefined

            expect(data).to.exist
            expect(data).to.be.an.instanceof(Object)

            done()
        })


    })

    it('should fail if callback is not a function', () => {

        expect(() => retrieveCrypto('bitcoin', 'hello world')).to.throw(Error)
    })


    it('should fail if id is not a string', () => {

        expect(() => retrieveCryptos([], (error, data) => data)).to.throw(Error)
    })


    it('should fail if id is not a crypto id', done => {

        retrieveCrypto('hello world', (error, data) => {
            expect(error).to.be.an.instanceof(Error)

            expect(data).to.be.undefined

            done()
        })

    })
})