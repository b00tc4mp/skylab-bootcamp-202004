function surfForecastLogic({forecastSelected}, callback){
        call('GET', `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=e440183fb8e545b0838104901200705&format=json&q=${forecastSelected.coordinates}`, undefined, undefined, (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            // const { name, surname, username } = JSON.parse(body)
            const info = JSON.parse(body)
            // const waveSize= info.data.weather[0].hourly[0].swellHeight_m

            callback(undefined, info)
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}