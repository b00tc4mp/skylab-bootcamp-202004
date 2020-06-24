require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { index } = require('coohappy-data/models/schemas/user')
const retrieveLaundry = require('../coohappy-app/node_modules/coohappy-client-logic/retrieve-laundry')


/**
 * Retrieve all users laundries.
 * 
 * @param {string} day Reservation day. 
 * @param {string} userId id of the current user. 
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = (userId, day) => {

    String.validate.notVoid(userId)

    return (async () => {

        const cohousing = await Cohousing.findOne({ members: ObjectId(userId) }, {
            __v: 0, members: 0, author: 0, name: 0, address: 0, accessCode: 0,
            foodList: 0, messages: 0, _id: 0
        }).lean()

        if (!cohousing) throw new UnexistenceError(`cohousing of user with id ${userId} does not exist`)


        delete cohousing._id
        for (key in cohousing.laundry) {
            delete cohousing.laundry[key]._id
          cohousing.laundry[key].userId = cohousing.laundry[key].user.toString()
            //if(cohousing.laundry[key].user.toString() === userId)  cohousing.currentHour = cohousing.laundry[key].hour
            delete cohousing.laundry[key].user
        }
        let { laundry/*, currentHour*/ } = cohousing

        laundry = laundry.filter(laun => {
            return laun.day === day
        })
        let returnedLaundry = []

        for (key in laundry) {

            laundry[key].amount = 0
            if (key === '0') {

                laundry[key].amount++
                returnedLaundry.push(laundry[key])
            } else {
                const index = returnedLaundry.findIndex(x => x.hour === laundry[key].hour)

                if (index === -1) {
                    laundry[key].amount++
                    returnedLaundry.push(laundry[key])
                } else {

                    returnedLaundry[index].amount++
                }
            }
        }
       // returnedLaundry.push(currentHour)
        return returnedLaundry

    })()
}