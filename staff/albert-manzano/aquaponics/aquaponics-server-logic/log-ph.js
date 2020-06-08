const { mongo } = require('aquaponics-data')
const { moment } = require('aquaponics-commons')

module.exports = (ph) => {

    return mongo.connect()
        .then(connection => {
            const ph = connection.db().collection('ph')
            const date= moment().format('MMMM Do YYYY, h:mm:ss a')

            return temperatures.insertOne( { ph, date } )
        })
} 