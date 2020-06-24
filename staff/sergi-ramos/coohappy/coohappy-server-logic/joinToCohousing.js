require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { DuplicityError, UnexistenceError } } = require('coohappy-commons')
const { models: { User, Cohousing } } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')
const bcrypt = require('bcryptjs')


module.exports = (userId, accessCode) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(accessCode)

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)
       
        const _cohousing = await Cohousing.findOne({ 'members': ObjectId(userId) })
        if (_cohousing) throw new DuplicityError(`User with id ${userId} already belongs to a cohousing`)

        const cohousing = await Cohousing.findOne({ accessCode: accessCode })
        if(!cohousing) throw new UnexistenceError(`cohousing with access code ${accessCode} does not exist `)
        await Promise.all([
            Cohousing.findByIdAndUpdate(cohousing.id, { $addToSet: { members: userId } }),
            User.findByIdAndUpdate(userId, { $set: { cohousing: cohousing._id } })
        ])

        return;
    })()
}