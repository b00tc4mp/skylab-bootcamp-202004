require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/json')
const { utils: {Email}} = require('termometro-commons')
const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')
// const bcrypt = require('bcryptjs')
const {UnexistenceError} = require('termometro-commons/errors')

// module.exports = (userId, name, surname, age, sex, email, password, members) => {
module.exports = (userId, data) => {
    for (const keys in data) {
        keys === 'email' && Email.validate(data[keys]);

        keys !== 'members' && String.validate.notVoid(data[keys])
    }

    String.validate.notVoid(userId)

    return (async() => {
        const user = await User.findById(userId);
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        let updateData = {}

        for (const keys in data) {
            updateData[keys] = data[keys];
        }

        await User.findByIdAndUpdate(userId, updateData);

        return
    })()
}