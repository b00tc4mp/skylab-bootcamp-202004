describe('google', () => {
    it('should succeed on matching query', done => {
        google('hello world', function(error, results) {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results.length).to.be.greaterThan(0)

            results.forEach(({ title, content, link}) => {
                expect(title).to.be.a('string')
                expect(content).to.be.a('string')
                expect(link).to.be.a('string')
            })

            done()
        })
    })
})