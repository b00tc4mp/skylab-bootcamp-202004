const { handleError } = require('../../helpers');
const unRegisterUser = require('termometro-server-logic/un-register-user');

module.exports = (req, res) => {
    const { payload } = req
    let userId;
    let paramsUserId;
    if (typeof payload !== 'undefined') userId = payload.sub
    else paramsUserId = req.params.userId

    if(typeof payload !== 'undefined') userId = payload.sub

    try {
        unRegisterUser(userId || paramsUserId)
            .then(()=> res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
