describe('searchSport', () => {
    it('should find the nodes selected with the DOM', (done) => {

        searchSport((list) => {

            expect(list).to.exist
            expect(list.length).to.be.greaterThan(0)

            list.forEach(element => {

                expect(element.title).to.be.a('string')
                expect(element.link).to.be.a('string')
                expect(element.linkImg).to.be.a('string')
            })

            done()
        })

        
    })
})