/**
 * Add score.
 * 
 * @param {string} userId take by token.  
 * @param {string} recievedPointUserId a userId how recived points.  
 * @param {Number} points points 1-5.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {CredentialsError} if you want a share a book and it not yours.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return No return nothig if successfully request.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/number')

const { errors: { UnexistenceError, CredentialsError } } = require('books-commons')
const { models: { User } } = require('books-data')

module.exports = (userId, recievedPointUserId, points) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(recievedPointUserId)
    Number.validate.positive(points)

    if (userId === recievedPointUserId) throw new CredentialsError("You can't vote yourself");

    if(points>5) throw Error ('the max value it is 5')

    return (async() => {
        const [user, secondUser] = await Promise.all([
            User.findById(userId),
            User.findById(recievedPointUserId)
        ])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        if (!secondUser) throw new UnexistenceError(`user with id ${recievedPointUserId} does not exist`);

        const alreadyScored = secondUser.score.findIndex(({ user }) => user.toString() === userId)

        if (alreadyScored !== -1) throw new CredentialsError("You already give points to this user");

        const score = { user: userId, points: points }

        await User.findByIdAndUpdate(recievedPointUserId, { $addToSet: { score } })

        const avgScore = secondUser.score.length === 0 ? points : parseFloat((((secondUser.score.reduce((acc, curr) => {debugger; return acc + curr.points}, points)) / (secondUser.score.length+1)))).toFixed(1)

        await User.findByIdAndUpdate(recievedPointUserId, { $set: { avgScore } })
    })()
}