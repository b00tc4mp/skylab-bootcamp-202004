const {changeWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) =>{
    const { body: { workGroupId} ,payload: { sub: userId }} = req

     try {
        return changeWorkGroup(userId, workGroupId)
            .then(()=> res.status(204).send({message:'user updated'}))
            .catch(error=> handleError(error, res))
    }catch(error){
        handleError(error,res)
    }
} 