const { retrieveLaundryAmount } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger
    try {
        const { payload: { sub: userId }, params:{ day} } = req
        console.log(userId)
        retrieveLaundryAmount(userId, day)
            .then(laundry => res.status(200).json(laundry))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}