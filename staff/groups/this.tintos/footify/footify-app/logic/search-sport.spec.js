describe('Sport News', () => {
    it('should succeed on return results', done => {
        searchSport((error, results)=> {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results.length).to.be.greaterThan(0)

            results.forEach(({ title, link, linkImg }) => {
                expect(title).to.be.a('string')
                expect(link).to.be.a('string')
                expect(linkImg).to.be.a('string')
            })

            done()
        })
    })
})