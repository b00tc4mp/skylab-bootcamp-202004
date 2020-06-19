/**
 * retrieves forecasts.
 * @returns {Promise<String>} The weather if it resolves, an error if it rejects.
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If a problem with request occurs
 */

require('aquaponics-commons/polyfills/string')
const { utils: { call } } = require('aquaponics-commons')
const context = require('./context')

module.exports = async function (index) {   
    const { status, body } = await call('GET', "https://community-open-weather-map.p.rapidapi.com/forecast?q=tagaytay&units=metric",
        undefined,
        {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
         "x-rapidapi-key": "4901ceb585msh6d2329b8180aec8p1c273bjsnad62098b1210"})

    if (status === 200) {
        const {list}= JSON.parse(body)
        const {temp,temp_min,temp_max}= list[index].main 
        const {main}= list[index].weather[0] 
        const {speed:wind} = list[index].wind
        
        return {temp,temp_max,temp_min,main,wind}
    } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
    }

}.bind(context)

