require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/json')
const { utils: { Email } } = require('termometro-commons')
const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')
const { UnexistenceError, DuplicityError } = require('termometro-commons/errors')

/**
 * Recieves the id of the user that is wanted to be updated and the new data.
 * 
 * @param {string} userId the user Id.
 * @param {Object} Data The new data.
 * 
 * 
 * @throws {TypeError} If the user doesn't exists or the email thath is wanted to update is already used
 * @throws {Error} if userId doesnt accomplish the expected validations.
 */

module.exports = (userId, data) => {

    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new UnexistenceError('El usuario que quieres actualizar no existe');

        const emailExists = await User.findOne({ email: data.email })

        const thisUser = await User.findById(userId)

        if (emailExists!==null && thisUser.email !== emailExists.email) {
            throw new DuplicityError('Este email ya está en uso!')
        }


        let updateData = {}

        for (const keys in data) {
            updateData[keys] = data[keys];
        }

        await User.findByIdAndUpdate(userId, updateData);

        return
    })()
}