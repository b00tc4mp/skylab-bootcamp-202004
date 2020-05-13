describe('search-spot', function () {
    let query='pipe'; 
    let sportState='surf';
    
    it('should succeed on correct data', () => {
        searchSpotList(query, sportState, (spotsFound) => {
            expect(spotsFound.length).to.equal(1)
        }
        )
    })
})


