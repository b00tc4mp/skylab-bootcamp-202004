const { updateUser } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => { debugger
    try {
        const { payload: {sub: id}, body} = req
        
        updateUser(id, body) 
            .then((message)=> res.status(204).send({message: message}))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}