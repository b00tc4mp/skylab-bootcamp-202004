describe('forecast', function () {
    let forecastSelected, sportState;
    describe('surf-forecast', function () {
        beforeEach(() => {
            forecastSelected = surfSpots[Math.floor(Math.random() * surfSpots.length)]
            sportState = 'surf'
        })
        it('should succeed on getting info from SURF api', (done) => {
            forecastLogic({ forecastSelected }, sportState, (error, info) => {
                expect(info).to.exist
                expect(info).to.be.an('object')
                expect(info.data.weather[0].date).to.exist
                expect(forecastSelected.coordinates).to.exist
                expect(error).to.be.undefined
                
                done()
            })
        })
    })
    describe('snow-forecast', function () {
        beforeEach(() => {
            forecastSelected = snowSpots[Math.floor(Math.random() * snowSpots.length)]
            sportState = 'snow'
        })
        it('should succeed on getting info from SNOW api', (done) => {

            forecastLogic({ forecastSelected }, sportState, (error, info) => {
                expect(info).to.exist
                expect(info).to.be.an('object')
                expect(info.data.weather[0].date).to.exist
                expect(forecastSelected.coordinates).to.exist
                expect(forecastSelected.name).to.equal(info.data.request[0].query)
                expect(error).to.be.undefined

                done()
            })
        })
    })

})

