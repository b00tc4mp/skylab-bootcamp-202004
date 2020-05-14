describe('search-spot', function () {
    let querySnow, snowState, querySurf, surfState;
    
    beforeEach(() => {
        querySnow= snowSpots[Math.floor(Math.random()*snowSpots.length)].name 
        snowState= 'snow'
        querySurf= surfSpots[Math.floor(Math.random()*surfSpots.length)].name 
        surfState= 'surf'
    })

    it('should succeed on finding the SNOW spot', () => {
        searchSpotList(querySnow, snowState, (spotsFound) => {
            expect(spotsFound).to.exist
            expect(spotsFound.length).to.equal(1)
            expect(spotsFound[0].name).to.equal(querySnow)
            expect(spotsFound[0]).to.be.an('object')
        }
        )
    })

    it('should succeed on finding the SURF spot', () => {
        searchSpotList(querySurf, surfState, (spotsFound) => {
            expect(spotsFound).to.exist
            expect(spotsFound.length).to.equal(1)
            expect(spotsFound[0].name).to.equal(querySurf)
            expect(spotsFound[0]).to.be.an('object')
        }
        )
    })
})