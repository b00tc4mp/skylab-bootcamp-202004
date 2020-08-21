const { updatePetition } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: {userId,workGroupId, petitionId, status} } = req
    try {
        return updatePetition(userId, workGroupId, petitionId, status)
                .then(()=> res.status(204).send({message: 'petition status updated'}))
                .catch(error=> handleError(error, res))
            }

    catch (error) {
        handleError(error, res)
    }
}