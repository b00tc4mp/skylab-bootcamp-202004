const { errors: {DuplicityError}} = require('termometro-commons')
const { model: { User } } = require('termometro-data')

module.exports = (name, surname, age, sexo, email, password) => {
    return (async() => {
        const user = await User.findOne({email})

        if(user) throw new DuplicityError('An user with this email has already been registered')

        await User.create({name, surname, age, sexo, email, password})
    })()
}