const { addPetition } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger
    const { body: { workGroupId } ,payload: { sub: userId } } = req
    
    try {
             addPetition(userId,workGroupId)
                .then(()=> res.status(201).send({message: 'petition is added'}))
                .catch(error=> handleError(error, res))
            }

    catch (error) {
        handleError(error, res)
    }
}