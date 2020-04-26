describe('google', () => {
    it('should succeed on matching query', done => {
        google('hello-world', function(error, results) {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results.length).to.be.greaterThan(0)

            results.forEach(({title, content, link}) => {
                expect(title).to.be.a('string')
                expect(content).to.be.a('string')
                expect(link).to.be.a('string')
            })

            done()
        })
    })

    it('should succed and return an empty array if non existing content is searched', done => {
        google('asdasdwergfw5454654453r3er356456321223rfsds', (error, results) => {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results).to.be.an('array')
            expect(results.length).to.equal(0)

            done()
        })
    })
})