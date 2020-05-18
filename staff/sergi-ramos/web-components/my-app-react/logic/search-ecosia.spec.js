describe('search-ecosia', () => {
    it('should find results with a query', (done) => {

        searchEcosia('Skylab coders', (error, list) => {

            expect(error).to.be.undefined
            expect(list.length).to.be.greaterThan(0)
            expect(list).to.exist
            
            list.forEach(element => {

                expect(element.title).to.be.a('string')
                expect(element.content).to.be.a('string')
                expect(element.link).to.be.a('string')                 
            });


            done()
        })

    })

})