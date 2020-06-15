const { handleError } = require('../../helpers')
const { retrieveChat } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const { body: { chatId } } = req
    
    try {
        retrieveChat(chatId)
            .then((chat) => res.send(chat))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
} 