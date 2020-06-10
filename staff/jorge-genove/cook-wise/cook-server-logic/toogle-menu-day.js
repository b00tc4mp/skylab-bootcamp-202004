require('cook-wise-commons/polyfills/string')
const { errors: { UnexistenceError, ValueError } } = require('cook-wise-commons')
const { mongoose: { ObjectId }, models: { User, Recipes} } = require('cook-wise-data')

module.exports = ( schedule,userId) => {
    if(schedule === null || typeof schedule === 'undefined' || !(schedule.constructor.name === 'Object')) throw new TypeError(`${schedule} must be an object`)
    const {weekday, timeline, recipe} = schedule;
    String.validate.notVoid(recipe)
    String.validate.notVoid(weekday)
    String.validate.notVoid(timeline)
    String.validate.notVoid(userId)
    

    return (async () => {
        const fullrecipe = await Recipes.findById(recipe)
        if (!fullrecipe) throw new UnexistenceError(`recipe with id ${recipe} does not exist`)
        
        const user = await User.findById(userId)
        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        schedule.recipe = fullrecipe

        const filtered = user.schedule.find(time => time.weekday === weekday && time.timeline === timeline);

        if (typeof filtered !== 'undefined')
           return await User.findByIdAndUpdate(userId, {$pull: {schedule: schedule}})

        await User.findByIdAndUpdate(userId, {$addToSet:  {schedule: schedule}});  
        
        return;
    })()
}
