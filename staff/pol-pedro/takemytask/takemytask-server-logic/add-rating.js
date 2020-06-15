require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { Worker, Rates }, mongoose: {ObjectId} } = require('takemytask-data')


module.exports = (userId, ratedId, stars) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(ratedId)
    Number.validate.integer(stars) //TODO  stars is between 0 and 5

    return (async () => {
        const user = await Worker.findOne({ _id: ObjectId(ratedId) }, {password: 0 })

        if (!user) throw new UnexistenceError(`worker with id ${userId} dont exists`)

        const rates = await Worker.findOne({"ratesWorker.userId": ObjectId(userId) })

        if(rates){

            for (var i in rates.ratesWorker){
                if(rates.ratesWorker[i].userId.equals(ObjectId(userId))){

                    rates.ratesWorker[i].stars = stars
                    rates.ratesWorker[i].date = new Date

                }
            }
            await rates.save()

        }else{

            user.ratesWorker.unshift( new Rates ({ 
                userId: ObjectId(userId), 
                stars, 
                date: new Date
            }))
    
            await user.save()
        }

    })()
}