const { addPetition } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { workGroupId } ,payload: { sub: userId } } = req
    try {
        return addPetition(workGroupId,userId)
                .then(()=> res.status(201).send({message: 'petition is added'}))
                .catch(error=> handleError(error, res))
            }

    catch (error) {
        handleError(error, res)
    }
}