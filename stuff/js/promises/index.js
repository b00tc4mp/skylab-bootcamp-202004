// callback "hell"

function retrieveForecast(callback) {
    setTimeout(() => callback({ temperature: 25, humidity: 80 }), 1000)
}

function convertForecast(forecast, callback) {
    setTimeout(() => {
        const { temperature } = forecast

        forecast.temperature = (temperature * 9/5) + 32 // to Farenheit

        callback(forecast)
    }, 1500)
}

function renderForecast({temperature, humidity}, callback) {
    setTimeout(() => {
        callback(`<section>
    <h1>Forecast</h1>
    <h2>Temperature</h2>
    <span>${temperature}</span>
    <h2>Humidity</h2>
    <span>${humidity}</span>
</section>`)
    }, 500)
}

retrieveForecast(forecast => {
    convertForecast(forecast, forecast => {
        renderForecast(forecast, console.log)
    })
})

// to promises

function retrieveForecast() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ temperature: 25, humidity: 80 }), 1000)
    })
}

function convertForecast(forecast) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { temperature } = forecast

            forecast.temperature = (temperature * 9/5) + 32 // to Farenheit

            resolve(forecast)
        }, 1500)
    })
}

function renderForecast({temperature, humidity}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`<section>
    <h1>Forecast</h1>
    <h2>Temperature</h2>
    <span>${temperature}</span>
    <h2>Humidity</h2>
    <span>${humidity}</span>
</section>`)
        }, 500)
    })
}

/*retrieveForecast()
    .then(forecast => {
        return convertForecast(forecast)
    })
    .then(forecast => {
        return renderForecast(forecast)
    })
    .then(render => console.log(render))*/

retrieveForecast()
    .then(convertForecast)
    .then(renderForecast)
    .then(console.log)

// with error handling

function retrieveForecast() {
    return new Promise((resolve, reject) => {
        setTimeout(() => 
        //resolve({ temperature: 25, humidity: 80 })
        reject(new Error('cant retrieve'))
        , 1000)
    })
}

function convertForecast(forecast) {
    if (!forecast) throw new Error('no forecaset to convert')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { temperature } = forecast

            forecast.temperature = (temperature * 9/5) + 32 // to Farenheit

            //resolve(forecast)
            reject(new Error('cant convert'))
        }, 1500)
    })
}

function renderForecast(forecast) {
    if (!forecast) return reject(new Error('no forecast to render'))

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`<section>
    <h1>Forecast</h1>
    <h2>Temperature</h2>
    <span>${temperature}</span>
    <h2>Humidity</h2>
    <span>${humidity}</span>
</section>`)
        }, 500)
    })
}

/*retrieveForecast()
    .then(forecast => {
        return convertForecast(forecast)
    })
    .then(forecast => {
        return renderForecast(forecast)
    })
    .then(render => console.log(render))*/

retrieveForecast()
    //.catch(console.error)
    .then(convertForecast)
    //.catch(console.error)
    .then(renderForecast)
    .then(console.log)
    .catch(console.error)