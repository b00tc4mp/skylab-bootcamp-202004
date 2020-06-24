/**
 * Checks user credentials.
 * 
 * @param {string} userId The user id. 
 * @param {string} workspaceId The workspace id. 
 * @param {number} stars The punctuation for the workspace. 
 * @param {string} text The user review for the workspace.
 * 
 * @returns {Promise<String>} Nothing if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {UnexistenceError} Cannot find workspace by workspaceId.
 * @throws {UnexistenceError} Cannot find user by userId.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('nomad-commons')

const { models: { Workspace, Review, User } } = require('nomad-data')

module.exports = async (userId, workspaceId, stars, text) => {

    const getScore = (ws) => {
        let total = ws.reviews.reduce((acc, curr) => {
            return acc + curr.stars;
        }, 0)
        const score = total / ws.reviews.length
        return score.toFixed(1)
    }

    String.validate.notVoid(userId)
    String.validate.notVoid(workspaceId)
    Number.validate(stars)
    String.validate.notVoid(text)

    const workspace = await Workspace.findById(workspaceId)
    if (!workspace) throw new UnexistenceError(`workspace with id ${workspaceId} does not exist`)

    const user = await User.findById(userId)
    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    user.reviews.push(workspaceId)

    await user.save()

    workspace.reviews.push(new Review({ user: userId, stars, text }))

    workspace.score = getScore(workspace)

    await workspace.save()

    return
}