const { sendFoodList } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { html, email }, payload: {sub: userId} } = req
debugger
try {
    (async()=>{
        const _res = await sendFoodList(userId, html, email)
        res.status(201).end()
    })()
} catch (error) {
    
    handleError(error, res)
}

}

