const { retrieveUserFoodList } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveUserFoodList(userId)
            .then(foodList => res.status(200).json(foodList))
            .catch(error => {

                handleError(error, res)
            })
    } catch (error) {
        handleError(error, res)
    }
}