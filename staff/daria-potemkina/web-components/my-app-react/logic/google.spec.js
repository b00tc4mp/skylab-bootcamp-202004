describe('google', () => {
    it('it should succeed on matching query', done => {
        searchGoogle('barcelona', function (error, results) {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results.length).to.be.greaterThan(0)

            results.forEach(({ title, content, link }) => {
                expect(title).to.be.a('string')
                expect(content).to.be.a('string')
                expect(link).to.be.a('string')
            })

            done()
        })
    })

    it('should return an error', () => {
        expect( () => {
            searchGoogle('    ')
            }).to.throw(Error, 'query is empty')
    })

    it('should return a type error', () =>{
        expect( () =>{
            searchGoogle(123)
        }).to.throw(TypeError, '123 is not a string')
    })
})

