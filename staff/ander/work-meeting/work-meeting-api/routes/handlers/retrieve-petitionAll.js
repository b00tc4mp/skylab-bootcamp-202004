const {retrievePetitionAll} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { body: { workGroupId } ,payload:{ sub: userId} } = req
        

        retrievePetitionAll(workGroupId ,userId)
            .then(petitions => res.send(petitions))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}