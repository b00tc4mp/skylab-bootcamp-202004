describe('searchGoogle', () => {
    it('should find google results with query', (done) => {
        searchGoogle('barça', function (error, results) {

            expect(error).to.be.undefined
            expect(results).to.exist
            expect(results.length).to.be.greaterThan(0)

            results.forEach(element => {

                expect(element.title).to.be.a('string')
                expect(element.content).to.be.a('string')
                expect(element.link).to.be.a('string')                
            })
            done()
        })
    })
})
