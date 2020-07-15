function forecastLogic({ forecastSelected }, sportState, callback) {
    if (sportState === 'surf') {
        var link=`http://api.worldweatheronline.com/premium/v1/marine.ashx?key=e440183fb8e545b0838104901200705&format=json&q=${forecastSelected.coordinates}`
    } else if(sportState==='snow'){
        var link=`http://api.worldweatheronline.com/premium/v1/ski.ashx?key=e440183fb8e545b0838104901200705&q=${forecastSelected.coordinates}&num_of_days=6&format=json`
    }
        call('GET', link, undefined, undefined, (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const info = JSON.parse(body)
                callback(undefined, info)

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        })
}

