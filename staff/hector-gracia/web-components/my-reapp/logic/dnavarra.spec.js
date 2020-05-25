describe('dnavarra', () => {
    it('should return the latest news in diario de navarra', done => {
        dnavarra(function(error, results) {
            expect(error).to.be.undefined
            expect(results).to.exist
            expect(results.length).to.be.greaterThan(0)
            for(var i=0;i<results.length;i++){
                expect(results[i][0]).to.be.a('string');
                expect(results[i][1]).to.be.a('string');
            }
            done()
        })
    })
})