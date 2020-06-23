const { handleError } = require('../../helpers')
const { retriveChatId } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const { payload: { sub: userId } } = req
    
    try {
        retriveChatId(userId)
            .then((chat) => res.send(chat))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
} 