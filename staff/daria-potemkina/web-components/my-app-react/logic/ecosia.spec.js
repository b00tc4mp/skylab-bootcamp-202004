describe('ecosia', () => {
    it('it should succeed on matching query', done => {
        searchEcosia('barcelona', function (error, results) {
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
            searchEcosia('    ')
            }).to.throw(Error, 'query is empty')
    })

    it('should return a type error', () =>{
        expect( () =>{
            searchEcosia(123)
        }).to.throw(TypeError, '123 is not a string')
    })
})