const {retrieveSoloWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }} = req

        retrieveSoloWorkGroup(userId)
            .then(workGroupPref => res.status(200).send(workGroupPref))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}