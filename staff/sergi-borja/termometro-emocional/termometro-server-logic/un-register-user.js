const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')


module.exports = (userId) => {
    return (async () => {
        const member = await User.findById(userId)

        const admin = await User.findById(member.admin)

        const memberIndex = admin.members.indexOf(userId)

        admin.members.splice(memberIndex, 1)

        await admin.save()

        await User.remove({ _id: ObjectId(userId) })
    })()
}