describe('latestNews', () => {
    it('should succed on loading the latest news', done => {
        latestNews((error, results) => {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results).to.be.an('array')
            expect(results.length).to.be.greaterThan(0)

            results.forEach(({title, content, link}) => {
                expect(title).to.be.a('string')
                expect(content).to.be.a('string')
                expect(link).to.be.a('string')
            })

            done()
        })
    })
})