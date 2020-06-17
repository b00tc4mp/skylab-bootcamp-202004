const { registerUser } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
/* return updatePetition()
        .then(accepted=>{
            if(accepted){
                addMemeber()
                .then(()=> res.status(200).send({message: 'user added to workgroup'}))
            }

            return res.status(200).send({message: 'user petition rejected'}) */