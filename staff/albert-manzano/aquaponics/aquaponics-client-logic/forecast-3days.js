/**
 * retrieves forecasts.
 * @returns {Promise<String>} The weather if it resolves, an error if it rejects.
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If a problem with request occurs
 */

require('aquaponics-commons/polyfills/string')
const { utils: { call } } = require('aquaponics-commons')
const context = require('./context')

module.exports = async function () {   
    const { status, body } = await call('GET', "https://community-open-weather-map.p.rapidapi.com/forecast?q=tagaytay&units=metric",
        undefined,
        {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
         "x-rapidapi-key": "4901ceb585msh6d2329b8180aec8p1c273bjsnad62098b1210"})

    if (status === 200) {
        const {list}= JSON.parse(body)
        const {temp1}= list[8].main 
        const {main1}= list[8].weather[0] 
        const {temp2}= list[16].main 
        const {main2}= list[16].weather[0] 
        const {temp3}= list[24].main 
        const {main3}= list[24].weather[0] 
        
        return {temp1,main1,temp2,main2,temp3,main3}
    } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
    }

}.bind(context)
