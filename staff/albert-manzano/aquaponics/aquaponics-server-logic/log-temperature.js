const { mongo } = require('aquaponics-data')
const { moment } = require('aquaponics-commons')

module.exports = (temperature) => {

    return mongo.connect()
        .then(connection => {
            const temperatures = connection.db().collection('temperatures')
            const date= moment().format('MMMM Do YYYY, h:mm:ss a')

            return temperatures.insertOne( { temperature, date } )
        })
} 