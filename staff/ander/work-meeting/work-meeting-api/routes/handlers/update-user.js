const {updateUser} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) =>{
    const { body: { name, surname, email, password, oldPassword } ,payload: { sub: userId }} = req

     try {
        return updateUser(userId, name, surname, email, password, oldPassword)
            .then(()=> res.status(204).send({message:'user updated'}))
            .catch(error=> handleError(error, res))
    }catch(error){
        handleError(error,res)
    }
} 