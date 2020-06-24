require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/json')
const { errors: { DuplicityError }, utils: { Email } } = require('termometro-commons')
const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')
const bcrypt = require('bcryptjs')

/**
 * if userId is undefined creates an admin, otherwise, creates a member
 * 
 * @param {string} userId 
 * @param {string} name
 * @param {string} surname
 * @param {string} age
 * @param {string} sex
 * @param {string} email
 * @param {string} password
 * @param {string} mood
 * @param {string} location
 * 
 * 
 * @throws {TypeError} if email already exists
 * @throws {Error} if any credentials doesnt accomplish the expected validations
 */

module.exports = (userId, name, surname, age, sex, location, email, password, mood) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    String.validate.notVoid(sex)
    String.validate.notVoid(location)
    if(userId) String.validate.notVoid(userId)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new DuplicityError('Este email ya está en uso!')

        const hash = await bcrypt.hash(password, 10)

        if (userId) {
            await User.create({ name, surname, age, sex, location, email, password: hash, admin: userId, mood })

            const member = await User.findOne({email})

            const adminUser = await User.findOne( {_id: ObjectId(userId)} )

            adminUser.members.push(ObjectId(member._id))

            await adminUser.save()

        } else {
            await User.create({ name, surname, age, sex, location, email, password: hash, mood })
        }
    })()
}