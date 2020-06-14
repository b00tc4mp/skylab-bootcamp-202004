const { deleteUser } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  try {
    const { payload: { sub: userId } } = req

    deleteUser(userId)
      .then(() => res.status(204).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}
