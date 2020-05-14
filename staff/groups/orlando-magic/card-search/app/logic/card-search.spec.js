describe.only('searchCard', () => {
    it('should succed if an existing element is searched', done => {
        searchCard('q=emrakul', (error, results) => {
            expect(error).to.be.undefined
            expect(results).to.exist
            expect(results).to.be.an('array')
            expect(results.length).to.be.greaterThan(0)

            done()
        })
    })

    it('should fail if a not matching query is searched', done => {
        searchCard('q=eoirhodfhghergeor', (error, results) => {
            expect(error).to.exist
            done()
        })
    })

    it('should fail if inputs are not of the correct type', () => {
        expect(() => {
            searchCard(1, () =>{})
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            searchCard('q=emrakul', true)
        }).to.throw(Error, 'true is not a function')
    })
})