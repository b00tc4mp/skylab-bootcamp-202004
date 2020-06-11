require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { UnexistenceError, DuplicityError } } = require('coohappy-commons')
const { models: { Cohousing, User } } = require('coohappy-data')
const { utils: { randomAccessCode } } = require('coohappy-commons')


module.exports = (name, address, laundryNum, userId) => {
    String.validate.notVoid(name)
    if (typeof address !== 'object') throw new TypeError(`${address} is not an object`)
    String.validate.notVoid(userId)
    const members = []

    return (async () => {
        const [user, cohousing] = await Promise.all([
            User.findById(userId),
            Cohousing.findOne({ author: userId })
        ])

        if (cohousing) throw new DuplicityError(`user: ${user.name} ${user.surname} already create an cohousing`)
        if (!user) throw new UnexistenceError(`user does not exists`)

        const accessCode = randomAccessCode(name)

        members.push(user)

        const newCohousing = await Cohousing.create({ author: userId, name, address,laundryNum, members, accessCode})

        await User.updateOne({ role: 'admin', cohousing: newCohousing._id})
    })()
}