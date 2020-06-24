const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')


/**
 * Recieves an userId and deletes an admin or a member.
 * 
 * @param {string} userId The userId
 * 
 * 
 * @throws {Error} If userId doesn't accomplish the expected validations
 */

module.exports = (userId) => {

    String.validate.notVoid(userId)

    return (async () => {

        const user = await User.findById(userId)

        if(user.admin) {

        const admin = await User.findById(user.admin)

        const memberIndex = admin.members.indexOf(userId)

        admin.members.splice(memberIndex, 1)

        await admin.save()

        await User.remove({ _id: ObjectId(userId) })

        } else {
            user.members.map((element)=>{
                async () => {
                await User.remove({ _id: ObjectId(element) })
                }
            })

            await User.remove({ _id: ObjectId(userId) })
        }
    })()
}