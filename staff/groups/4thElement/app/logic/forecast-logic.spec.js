describe('surf-forecast', function () {
    let forecastSelected, sportState;

    beforeEach(() => {
        forecastSelected = surfSpots[Math.floor(Math.random() * surfSpots.length)]
        sportState= 'surf'
        link=`http://api.worldweatheronline.com/premium/v1/marine.ashx?key=e440183fb8e545b0838104901200705&format=json&q=${forecastSelected.coordinates}`

    })
    it('should succeed on getting info from SURF api', () => {

        forecastLogic({forecastSelected}, sportState, (error, info) => {
            expect(info).to.exist
            expect(info).to.be.an('object')
            expect(info.data.weather[0].date).to.exist
            expect(forecastSelected.coordinates).to.exist
            expect(error).to.be.undefined
        })
    })
})

describe('snow-forecast', function () {
    let forecastSelected, sportState, surfState;
    beforeEach(() => {
        forecastSelected = snowSpots[Math.floor(Math.random() * snowSpots.length)]
        sportState= 'snow'
        link=`http://api.worldweatheronline.com/premium/v1/ski.ashx?key=e440183fb8e545b0838104901200705&q=${forecastSelected.coordinates}&num_of_days=6&format=json`
    })
    it('should succeed on getting info from SNOW api', () => {

        forecastLogic({forecastSelected}, surfState, (error, info) => {
            expect(info).to.exist
            expect(info).to.be.an('object')
            expect(info.data.weather[0].date).to.exist
            expect(forecastSelected.coordinates).to.exist
            expect(forecastSelected.name).to.equal(info.data.request[0].query)
            expect(error).to.be.undefined
        })
    })
})


