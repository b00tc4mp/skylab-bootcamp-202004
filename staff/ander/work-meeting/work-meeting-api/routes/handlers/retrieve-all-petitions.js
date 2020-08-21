const {retrieveAllPetitions} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId } ,payload:{ sub: userId} } = req
        

        retrieveAllPetitions(userId, workGroupId)
            .then(petitions => res.send(petitions))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}